import { join, dirname, basename, extname, normalize } from "path";
import { IOptions } from "../util";

export const fsPath = (id: string, options: IOptions): string => {
  const path = normalize(join(options.path, id));
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

export const metaFolder = (id: string, options: IOptions): string =>
  join(dirname(id), options.metaFolder);

export const metaFile = (id: string, options: IOptions): string =>
  join(metaFolder(id, options), `${basename(id)}.json`);

export const entryName = (id: string): string => basename(id, extname(id));

export const entryContentType = (id: string): string =>
  extname(id).slice(1) as string;
