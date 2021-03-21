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

  public getEntry = (id: string): Maybe<Entry> => {
    const rawEntry = this.repository.cache.get(id);
    if (!rawEntry) return null;
    return this.expandEntry({ id, cacheEntry: rawEntry });
  };

  public expandEntry = ({
    id,
    cacheEntry: { __typename }
  }: {
    id: string;
    cacheEntry: CacheEntry;
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

  private sort = (entries: Array<Entry>): Array<Entry> =>
    entries.sort((a, b) => {
      const aName = a.id.split("/").slice(-1);
      const bName = b.id.split("/").slice(-1);
      if (a.__typename === "Folder" && b.__typename === "File") return -1;
      if (a.__typename === "File" && b.__typename === "Folder") return 1;
      else if (aName < bName) return -1;
      else if (aName > bName) return 1;
      else return 0;
    });

  private calculatePrevNext = (entries: Array<Entry>): Array<Entry> =>
    entries.reduce((accumulator, entry, index, entries) => {
      return [
        ...accumulator,
        {
          ...entry,
          prev:
            entry.__typename === "File"
              ? index === 0 || entries[index - 1].__typename === "Folder"
                ? undefined
                : entries[index - 1].id
              : undefined,
          next:
            entry.__typename === "File"
              ? index === entries.length - 1
                ? undefined
                : entries[index + 1].id
              : undefined
        }
      ];
    }, [] as Array<Entry>);

  private filterEntries = (
    filterFn: ([key, cacheEntry]: [string, CacheEntry]) => boolean
  ): Array<Entry> =>
    Array.from(this.repository.cache)
      .filter(filterFn)
      .map(([id, cacheEntry]) => this.expandEntry({ id, cacheEntry }));

  public getEntries = (id: string): Array<Entry> =>
    this.calculatePrevNext(
      this.sort(
        this.filterEntries(([key]) => dirname(key) === id || key === id)
      )
    );

  public search = (filterMetaData: MetaDataInput): Array<Entry> =>
    this.calculatePrevNext(
      this.sort(
        this.filterEntries(([, rawEntry]) =>
          satisfiesFilter(rawEntry.metaData, filterMetaData)
        )
      )
    );

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
