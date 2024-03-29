import { dirname, basename, extname } from "path";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { IOptions } from "../util";
import {
  Entry,
  Folder,
  File,
  Maybe,
  MetaData,
  MetaDataInput,
  MutationAddAttributeArgs,
  Scalars
} from "../generated/graphql";
import { Cache, ID, Repository } from "../repo";
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

export const isFile = (cacheElement: File | Folder): boolean =>
  cacheElement.__typename === "File";

export const isFolder = (cacheElement: Entry): boolean => !isFile(cacheElement);

const metaFilter = (key: string): boolean => !key.startsWith("_");

export class FileSystemDataSource extends DataSource {
  options!: IOptions;

  constructor(readonly repository: Repository) {
    super();
  }

  initialize(config: DataSourceConfig<IContext>): void {
    this.options = config.context.options;
  }

  get tags() {
    return Array.from(this.repository.tags).filter(metaFilter);
  }

  get attributes() {
    return Array.from(this.repository.attributes).filter(metaFilter);
  }

  private sort = (entries: Array<Entry>): Array<Entry> =>
    entries.sort((a, b) => {
      const aName = a.id.split("/").slice(-1);
      const bName = b.id.split("/").slice(-1);
      if (isFolder(a) && isFile(b)) return -1;
      if (isFile(a) && isFolder(b)) return 1;
      else if (aName < bName) return -1;
      else if (aName > bName) return 1;
      else return 0;
    });

  private calculatePrevNext = (
    entries: Array<File | Folder>
  ): Array<File | Folder> =>
    entries.reduce((accumulator, entry, index, entries) => {
      return [
        ...accumulator,
        {
          ...entry,
          ...(entry.__typename === "File"
            ? {
                prev:
                  index === 0 || isFolder(entries[index - 1])
                    ? undefined
                    : entries[index - 1].id,
                next:
                  index === entries.length - 1
                    ? undefined
                    : entries[index + 1].id
              }
            : {})
        }
      ];
    }, [] as Array<Entry>);

  private filterEntries = (
    filterFn: ([key, cacheEntry]: [string, File | Folder]) => boolean
  ): Array<Entry> =>
    Array.from(this.repository.cache)
      .filter(filterFn)
      .map(([, cacheEntry]) => cacheEntry);

  public getEntry = (id: string): Maybe<Entry> => {
    const rawEntry = this.repository.cache.get(id);
    if (!rawEntry) return null;
    return rawEntry;
  };

  public getEntries = (id: string): Array<Entry> =>
    this.calculatePrevNext(
      this.sort(this.filterEntries(([key]) => dirname(key) === id))
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

        this.repository.cache.set(id, { ...cacheEntry, metaData });
        metaData.tags?.forEach(tag => this.repository.tags.add(tag));
        metaData.attributes?.forEach(([key]) =>
          this.repository.attributes.add(key)
        );
        return metaData;
      } else {
        remove(fsPath(metaFile(id, this.options), this.options));

        this.repository.cache.set(id, {
          ...cacheEntry,
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
