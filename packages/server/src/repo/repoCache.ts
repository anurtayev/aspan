import { Stats, statSync } from "fs";
import { relative, basename, extname } from "path";
import { Maybe, MetaData, Scalars } from "../generated/graphql";
import { IOptions } from "../util";
import klawSync, { Item } from "klaw-sync";
import { metaFile, fsPath } from "./path";
import { pathExistsSync, readJsonSync } from "fs-extra";

export type MemoryRepoEntry = {
  stats: Stats;
  metaData: Maybe<MetaData>;
  prev?: Scalars["String"];
  next?: Scalars["String"];
};

export type MemoryRepo = Map<Scalars["ID"], MemoryRepoEntry>;

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

  const filteredEntries = paths
    .map(({ stats, path }) => ({
      stats,
      id: "/" + relative(options.path, path)
    }))
    .filter(
      ({ id, stats }) =>
        !basename(id).startsWith(".") &&
        basename(id) !== options.metaFolder &&
        (stats.isDirectory() ||
          options.exts.includes(extname(basename(id)).toLowerCase()))
    );

  const sortedKeys = filteredEntries
    .filter(({ stats }) => !stats.isDirectory())
    .map(element => element.id)
    .sort((a, b) => {
      const aPathElems = a.split("/");
      const bPathElems = b.split("/");
      if (aPathElems.length < bPathElems.length) return -1;
      else if (aPathElems.length > bPathElems.length) return 1;
      else if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    });

  const cache = filteredEntries.reduce(
    (accumulator: MemoryRepo, { id, stats }: { id: string; stats: Stats }) => {
      let prev, next;

      if (!stats.isDirectory()) {
        const index = sortedKeys.indexOf(id);

        if (
          index > 0 &&
          JSON.stringify(id.split("/").slice(1, -1)) ===
            JSON.stringify(sortedKeys[index - 1].split("/").slice(1, -1))
        ) {
          prev = sortedKeys[index - 1];
        }

        if (
          index < sortedKeys.length - 1 &&
          JSON.stringify(id.split("/").slice(1, -1)) ===
            JSON.stringify(sortedKeys[index + 1].split("/").slice(1, -1))
        ) {
          next = sortedKeys[index + 1];
        }
      }

      return accumulator.set(id, {
        stats,
        metaData: getMetaData({ id, options }),
        prev,
        next
      });
    },
    new Map()
  );

  console.log(
    `walked repository in ${new Date().getTime() - startTime.getTime()}ms`
  );
  console.log(`processed ${paths.length} entries`);
  console.log(`showing ${cache.size} entries`);

  return cache;
};
