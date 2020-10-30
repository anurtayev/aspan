import { dirname, basename, extname } from "path";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { IOptions } from "../util";
import {
  FolderElement,
  Maybe,
  MetaData,
  MutationAddAttributeArgs
} from "../generated/graphql";
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
import { ensureDir, writeJson, pathExists, remove } from "fs-extra";

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
    if (!rawEntry) return null;
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

  public getFolderEntries = (id: string): Array<FolderElement> | null => {
    const retVal: Array<FolderElement> = [];
    for (const [key, rawEntry] of this.cache) {
      if (dirname(key) === id) {
        retVal.push(this.expandEntry({ id: key, rawEntry }));
      }
    }

    return retVal.length === 0 ? null : retVal;
  };

  public findEntries = (terms: string[]): Array<FolderElement> | null => {
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

    return retVal.length === 0 ? null : retVal;
  };

  public getMetaData = (id: string): Maybe<MetaData> => {
    const metaData = this.cache.get(id)?.metaData;
    return metaData ? metaData : null;
  };

  public setMetaData = async (
    id: string,
    metaData: Maybe<MetaData>
  ): Promise<Maybe<MetaData>> => {
    if (await pathExists(fsPath(id, this.options))) {
      if (
        metaData &&
        typeof metaData === "object" &&
        Reflect.ownKeys(metaData).length > 0
      ) {
        await ensureDir(fsPath(metaFolder(id, this.options), this.options));
        await writeJson(
          fsPath(metaFile(id, this.options), this.options),
          metaData
        );

        const cacheEntry = this.cache.get(id);
        if (!cacheEntry) throw new Error("missing cache entry for " + id);
        this.cache.set(id, { stats: cacheEntry.stats, metaData });
        return metaData;
      } else {
        remove(fsPath(metaFile(id, this.options), this.options));

        const cacheEntry = this.cache.get(id);
        if (!cacheEntry) throw new Error("missing cache entry for " + id);
        this.cache.set(id, { stats: cacheEntry.stats, metaData: null });
        return null;
      }
    } else {
      return null;
    }
  };

  public addTag = async (id: string, tag: string): Promise<MetaData | null> =>
    await this.setMetaData(id, addTag(this.getMetaData(id), tag));

  public removeTag = async (
    id: string,
    tag: string
  ): Promise<MetaData | null> =>
    await this.setMetaData(id, removeTag(this.getMetaData(id), tag));

  public addAttribute = async ({
    id,
    attribute
  }: MutationAddAttributeArgs): Promise<MetaData | null> =>
    await this.setMetaData(id, addAttribute(this.getMetaData(id), attribute));

  public removeAttribute = async (
    id: string,
    attribute: string
  ): Promise<MetaData | null> =>
    await this.setMetaData(
      id,
      removeAttribute(this.getMetaData(id), attribute)
    );

  public setTitle = async (
    id: string,
    title: string
  ): Promise<MetaData | null> =>
    await this.setMetaData(id, setTitle(this.getMetaData(id), title));

  public setDescription = async (
    id: string,
    description: string
  ): Promise<MetaData | null> =>
    await this.setMetaData(
      id,
      setDescription(this.getMetaData(id), description)
    );
}
