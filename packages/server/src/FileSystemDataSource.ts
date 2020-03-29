import { join, dirname, basename, extname, normalize } from "path";
import {
  ensureDir,
  lstat,
  readdir,
  readJson,
  writeJson,
  Stats,
  pathExists,
  remove,
  emptyDir,
  readFile
} from "fs-extra";
import { File, Folder, Entry, MetaData, Maybe } from "./generated/graphql";
import glob from "glob";
import {
  addTag,
  removeTag,
  addAttribute,
  removeAttribute
} from "./metaDataHelpers";
import sharp from "sharp";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { RepositoryOptions } from "./types";

export default class FileSystemDataSource extends DataSource {
  options!: RepositoryOptions;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<RepositoryOptions>): void {
    this.options = config.context;
    // this.httpCache = new HTTPCache(config.cache, this.httpFetch);
  }

  public getEntry = async (id: string): Promise<Entry> => {
    const stats = await this.stats(id);

    return stats.isFile()
      ? {
          id,
          type: "File",
          size: stats.size,
          contentType: "jpg"
        }
      : {
          id,
          type: "Folder"
        };
  };

  public getFolderEntries = async (id: string): Promise<Array<Entry>> => {
    return (
      await Promise.all(
        (await readdir(this.fsPath(id)))
          .filter(
            (entryId: string): boolean =>
              entryId !== this.options.metaFolder &&
              !basename(entryId).startsWith(".")
          )
          .map((entryId: string): string => normalize(join(id, entryId)))
          .map((entryId: string): Promise<Entry> => this.getEntry(entryId))
      )
    ).filter(
      (entry: Entry) =>
        entry.__typename === "Folder" ||
        (entry.__typename === "File" &&
          this.options.exts.includes(entry.contentType))
    );
  };

  public findEntries = async (pattern: string): Promise<Array<Entry>> => {
    const options = {
      cwd: this.options.path,
      root: this.options.path
    };

    return new Promise<Array<File | Folder>>((resolve, reject) => {
      glob(pattern, options, (error, files) => {
        if (error) {
          return reject(error);
        }

        return resolve(
          Promise.all(
            files
              .map(fileName => fileName.slice(this.options.path.length))
              .map(
                async (fileName: string) =>
                  this.getEntry(fileName) as Promise<Entry>
              )
          )
        );
      });
    });
  };

  public getMetaData = async (id: string): Promise<Maybe<MetaData>> => {
    const metaFileFSPath = this.fsPath(this.metaFile(id));
    if (await pathExists(metaFileFSPath)) {
      return await readJson(metaFileFSPath);
    } else {
      return null;
    }
  };

  public setMetaData = async (
    id: string,
    metaData: MetaData
  ): Promise<MetaData> => {
    if (metaData && (metaData.attributes || metaData.tags)) {
      await ensureDir(this.fsPath(this.metaFolder(id)));
      await writeJson(this.fsPath(this.metaFile(id)), metaData);
    }
    return metaData;
  };

  public addTag = async (id: string, tag: string): Promise<MetaData> =>
    await this.setMetaData(id, addTag(await this.getMetaData(id), tag));

  public removeTag = async (id: string, tag: string): Promise<MetaData> =>
    await this.setMetaData(id, removeTag(await this.getMetaData(id), tag));

  public addAttribute = async (
    id: string,
    attribute: [string]
  ): Promise<MetaData> =>
    await this.setMetaData(
      id,
      addAttribute(await this.getMetaData(id), attribute)
    );

  public removeAttribute = async (
    id: string,
    attribute: string
  ): Promise<MetaData> =>
    await this.setMetaData(
      id,
      removeAttribute(await this.getMetaData(id), attribute)
    );

  private stats = async (id: string): Promise<Stats> => lstat(this.fsPath(id));

  public walkChildren = async (folder: string, callBack: any) => {
    await Promise.all(
      (await this.getFolderEntries(folder)).map(async entry => {
        await callBack(entry);
        if (entry.type === "Folder") {
          return this.walkChildren(entry.id, callBack);
        }
      })
    );
  };

  public makeThumb = async (id: string) => {
    await ensureDir(this.fsPath(this.metaFolder(id)));
    await sharp(this.fsPath(id))
      .resize(200, 200)
      .toFile(this.fsPath(this.thumbFile(id)));
  };

  public fsPath = (id: string): string => {
    const path = normalize(join(this.options.path, id));
    return path.endsWith("/") ? path.slice(0, -1) : path;
  };

  public metaFolder = (id: string): string =>
    join(dirname(id), this.options.metaFolder);

  public metaFile = (id: string): string =>
    join(this.metaFolder(id), `${basename(id)}.json`);

  public entryName = (id: string): string => basename(id, extname(id));

  public entryContentType = (id: string): string =>
    extname(id).slice(1) as string;

  public parentId = (id: string): string => dirname(id);

  public thumbFile = (id: string): string =>
    `${this.metaFolder(id)}/${this.options.thumbsPrefix}${this.entryName(
      id
    )}.${this.entryContentType(id)}`;

  public empty = async () => {
    await remove(this.options.path);
    await emptyDir(this.options.path);
  };

  public getBase64ImageString = async (id: string) => {
    return new Buffer(await readFile(this.fsPath(id))).toString("base64");
  };

  public getBase64ThumbString = async (id: string) => {
    if (pathExists(id)) {
      return this.getBase64ImageString(this.thumbFile(id));
    }
    return null;
  };
}
