import { Stats } from "fs";
import { relative, basename, extname } from "path";
import { MetaData, IOptions } from "../util";
import klawSync, { Item } from "klaw-sync";
import { metaFile, fsPath } from "./path";
import { pathExistsSync, readJsonSync } from "fs-extra";

export type MemoryRepoEntry = {
  stats: Stats;
  metaData?: MetaData;
};

export type MemoryRepo = Map<string, MemoryRepoEntry>;

const getMetaData = ({
  id,
  options
}: {
  id: string;
  options: IOptions;
}): MetaData | undefined => {
  const metaFileFSPath = fsPath(metaFile(id, options), options);
  if (pathExistsSync(metaFileFSPath)) {
    return readJsonSync(metaFileFSPath);
  } else {
    return undefined;
  }
};

export const repoCache = (options: IOptions): MemoryRepo => {
  const paths = klawSync(options.path);

  return paths.reduce((accumulator: MemoryRepo, currentValue: Item) => {
    const id = "/" + relative(options.path, currentValue.path);

    if (
      !basename(id).startsWith(".") &&
      basename(id) !== options.metaFolder &&
      (currentValue.stats.isDirectory() ||
        options.exts.includes(extname(basename(id))))
    ) {
      accumulator.set(id, {
        stats: currentValue.stats,
        metaData: getMetaData({ id, options })
      });
    }

    return accumulator;
  }, new Map());
};
