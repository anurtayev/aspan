import { dirname, basename, extname } from "path";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { IOptions } from "../util";
import {
  Entry,
  Maybe,
  MetaData,
  MetaDataInput,
  MutationAddAttributeArgs,
  Scalars
} from "../generated/graphql";
import { Cache, CacheEntry, Repository } from "../repo";
import { IContext } from "../util";
import {
  addTag,
  removeTag,
  addAttribute,
  removeAttribute,
  satisfiesFilter
} from "./metaDataHelpers";
import { metaFile, metaFolder, fsPath } from "./path";
import { ensureDir, writeJson, pathExists, remove } from "fs-extra";

export class FileSystemDataSource extends DataSource {
  options!: IOptions;

  constructor(readonly repository: Repository) {
    super();
  }

  initialize(config: DataSourceConfig<IContext>): void {
    this.options = config.context.options;
  }

  get tags() {
    return Array.from(this.repository.tags);
  }

  get attributes() {
    return Array.from(this.repository.attributes);
  }

  public getEntry = (id: Scalars["ID"]): Maybe<Entry> => {
    const rawEntry = this.repository.cache.get(id);
    if (!rawEntry) return null;
    return this.expandEntry({ id, rawEntry });
  };

  public expandEntry = ({
    id,
    rawEntry: { __typename }
  }: {
    id: string;
    rawEntry: CacheEntry;
  }): Entry => {
    const contentType = extname(id);
    const dockerImageUrl = process.env.DOCKER_NETWORK_PICREPO_URL + id;
    const imageUrl = process.env.IMG_CDN_URL + id;

    return __typename === "File"
      ? {
          __typename: "File",
          id,
          contentType,
          thumbImageUrl:
            process.env.THUMBOR_URL +
            `/unsafe/${process.env.THUMBS_LENGTH}x${process.env.THUMBS_WIDTH}/` +
            encodeURIComponent(dockerImageUrl),
          imageUrl
        }
      : {
          __typename: "Folder",
          id
        };
  };

  public getFolderEntries = (
    folderId: string,
    filterMetaData: Maybe<MetaDataInput> | undefined
  ): Array<Entry> => {
    const retVal: Array<Entry> = [];
    for (const [key, rawEntry] of this.repository.cache) {
      const { metaData } = rawEntry;

      if (
        dirname(key) === folderId &&
        satisfiesFilter(metaData, filterMetaData)
      ) {
        retVal.push(this.expandEntry({ id: key, rawEntry }));
      }
    }

    return retVal;
  };

  public findEntries = (filterMetaData: MetaDataInput): Array<Entry> | null => {
    if (!filterMetaData.tags && !filterMetaData.attributes) return null;
    const retVal: Array<Entry> = [];

    for (const [key, rawEntry] of this.repository.cache) {
      const { metaData } = rawEntry;

      if (satisfiesFilter(metaData, filterMetaData)) {
        retVal.push(this.expandEntry({ id: key, rawEntry }));
      }
    }

    return retVal;
  };

  public getMetaData = (id: string): Maybe<MetaData> => {
    const metaData = this.repository.cache.get(id)?.metaData;
    return metaData ? metaData : null;
  };

  public setMetaData = async (
    id: string,
    metaData: Maybe<MetaData>
  ): Promise<Maybe<MetaData>> => {
    if (await pathExists(fsPath(id, this.options))) {
      const cacheEntry = this.repository.cache.get(id);
      if (!cacheEntry) throw new Error("missing cache entry for " + id);
      const { __typename } = cacheEntry;

      if (
        metaData &&
        typeof metaData === "object" &&
        Reflect.ownKeys(metaData).length > 0 &&
        ((metaData.tags && metaData.tags.length > 0) ||
          (metaData.attributes && metaData.attributes.length > 0))
      ) {
        // remove empty fiedls
        if (metaData.tags && metaData.tags.length === 0) {
          delete metaData.tags;
        }
        if (metaData.attributes && metaData.attributes.length === 0) {
          delete metaData.attributes;
        }

        await ensureDir(fsPath(metaFolder(id, this.options), this.options));
        await writeJson(
          fsPath(metaFile(id, this.options), this.options),
          metaData
        );

        this.repository.cache.set(id, { __typename, metaData });
        metaData.tags?.forEach(tag => this.repository.tags.add(tag));
        metaData.attributes?.forEach(([key]) =>
          this.repository.attributes.add(key)
        );
        return metaData;
      } else {
        remove(fsPath(metaFile(id, this.options), this.options));

        this.repository.cache.set(id, {
          __typename,
          metaData: null
        });
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
}
