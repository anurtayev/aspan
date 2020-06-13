import { dirname, basename, extname } from "path";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { IOptions, FolderElement, MetaData } from "../util";
import { MemoryRepo, MemoryRepoEntry } from "../repo";
import { IContext } from "../util";
import {
  addTag,
  removeTag,
  addAttribute,
  removeAttribute,
  setTitle,
  setDescription
} from "./metaDataHelpers";
import { metaFile, metaFolder, fsPath } from "./path";
import { ensureDir, writeJson, pathExists } from "fs-extra";

export class FileSystemDataSource extends DataSource {
  options!: IOptions;

  constructor(readonly cache: MemoryRepo) {
    super();
  }

  initialize(config: DataSourceConfig<IContext>): void {
    this.options = config.context.options;
  }

  public getEntry = (id: string) => {
    const rawEntry = this.cache.get(id);
    if (!rawEntry) return undefined;
    return this.expandEntry({ id, rawEntry });
  };

  public expandEntry = ({
    id,
    rawEntry
  }: {
    id: string;
    rawEntry: MemoryRepoEntry;
  }): FolderElement => {
    const stats = rawEntry.stats;
    const contentType = extname(id);
    const name = basename(id);
    const dockerImageUrl = process.env.DOCKER_NETWORK_PICREPO_URL + id;
    const imageUrl = process.env.IMG_CDN_URL + id;

    return stats.isFile()
      ? {
          __typename: "File",
          id,
          size: stats.size,
          contentType,
          name,
          thumbImageUrl:
            process.env.THUMBOR_URL +
            `/unsafe/${process.env.THUMBS_LENGTH}x${process.env.THUMBS_WIDTH}/` +
            encodeURIComponent(dockerImageUrl),
          imageUrl
        }
      : {
          __typename: "Folder",
          id,
          name
        };
  };

  public getFolderEntries = (id: string): Array<FolderElement> | undefined => {
    const retVal: Array<FolderElement> = [];
    for (const [key, rawEntry] of this.cache) {
      if (dirname(key) === id) {
        retVal.push(this.expandEntry({ id: key, rawEntry }));
      }
    }

    return retVal.length === 0 ? undefined : retVal;
  };

  public findEntries = (terms: string[]): Array<FolderElement> | undefined => {
    const retVal: Array<FolderElement> = [];
    for (const [key, rawEntry] of this.cache) {
      const { metaData } = rawEntry;
      if (!metaData) continue;

      const { title, description, tags, attributes } = metaData;

      const searchString =
        (title ? title : "") +
        (description ? description : "") +
        (tags ? tags.join() : "") +
        (attributes ? attributes.map(attr => attr.join()).join() : "");

      if (terms.every(term => searchString.includes(term))) {
        retVal.push(this.expandEntry({ id: key, rawEntry }));
      }
    }

    return retVal.length === 0 ? undefined : retVal;
  };

  public getMetaData = (id: string): MetaData | undefined =>
    this.cache.get(id)?.metaData;

  public setMetaData = async (
    id: string,
    metaData: MetaData
  ): Promise<MetaData | undefined> => {
    if (await pathExists(fsPath(id, this.options))) {
      if (metaData && (metaData.attributes || metaData.tags)) {
        await ensureDir(fsPath(metaFolder(id, this.options), this.options));
        await writeJson(
          fsPath(metaFile(id, this.options), this.options),
          metaData
        );

        const cacheEntry = this.cache.get(id);
        if (!cacheEntry) throw new Error("missing cache entry for " + id);
        this.cache.set(id, { stats: cacheEntry.stats, metaData });
      }
      return metaData;
    } else {
      return undefined;
    }
  };

  public addTag = async (
    id: string,
    tag: string
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(id, addTag({ metaData: this.getMetaData(id), tag }));

  public removeTag = async (
    id: string,
    tag: string
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(
      id,
      removeTag({ metaData: this.getMetaData(id), tag })
    );

  public addAttribute = async (
    id: string,
    attribute: [string]
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(
      id,
      addAttribute({ metaData: this.getMetaData(id), attribute })
    );

  public removeAttribute = async (
    id: string,
    attribute: string
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(
      id,
      removeAttribute({ metaData: this.getMetaData(id), attribute })
    );

  public setTitle = async (
    id: string,
    title: string
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(
      id,
      setTitle({ metaData: this.getMetaData(id), title })
    );

  public setDescription = async (
    id: string,
    description: string
  ): Promise<MetaData | undefined> =>
    await this.setMetaData(
      id,
      setDescription({ metaData: this.getMetaData(id), description })
    );
}
