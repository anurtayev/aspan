import { Stats } from "fs";
import { relative, basename, extname } from "path";
import { Maybe, MetaData } from "../generated/graphql";
import { IOptions } from "../util";
import klawSync, { Item } from "klaw-sync";
import { metaFile, fsPath } from "./path";
import { pathExistsSync, readJsonSync } from "fs-extra";

export type MemoryRepoEntry = {
  stats: Stats;
  metaData: Maybe<MetaData>;
};

export type MemoryRepo = Map<string, MemoryRepoEntry>;

const getMetaData = ({
  id,
  options
}: {
  id: string;
  options: IOptions;
}): Maybe<MetaData> => {
  const metaFileFSPath = fsPath(metaFile(id, options), options);
  if (pathExistsSync(metaFileFSPath)) {
    return readJsonSync(metaFileFSPath);
  } else {
    return null;
  }
};

export const repoCache = (options: IOptions): MemoryRepo => {
  const startTime = new Date();
  const paths = klawSync(options.path);
  let totalEntries = 0;
  let includedEntries = 0;

  const returnValue = paths.reduce(
    (accumulator: MemoryRepo, currentValue: Item) => {
      totalEntries++;
      const id = "/" + relative(options.path, currentValue.path);

      if (
        !basename(id).startsWith(".") &&
        basename(id) !== options.metaFolder &&
        (currentValue.stats.isDirectory() ||
          options.exts.includes(extname(basename(id)).toLowerCase()))
      ) {
        accumulator.set(id, {
          stats: currentValue.stats,
          metaData: getMetaData({ id, options })
        });
        includedEntries++;
      }

      return accumulator;
    },
    new Map()
  );

  console.log(
    `walked repository in ${new Date().getTime() - startTime.getTime()}ms`
  );
  console.log(`processed ${totalEntries} entries`);
  console.log(`showing ${includedEntries} entries`);

  return returnValue;
};
