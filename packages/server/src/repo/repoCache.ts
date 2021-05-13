import { Stats, statSync } from "fs";
import { relative, basename, extname } from "path";
import {
  Maybe,
  MetaData,
  Scalars,
  Entry,
  File,
  Folder
} from "../generated/graphql";
import { IOptions } from "../util";
import klawSync, { Item } from "klaw-sync";
import { metaFile, fsPath } from "./path";
import { pathExistsSync, readJsonSync } from "fs-extra";

export type Tags = Set<string>;
export type Attributes = Set<string>;
export type ID = Scalars["ID"];

export type Cache = Map<ID, File | Folder>;

export type Repository = { tags: Tags; attributes: Attributes; cache: Cache };

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

export const repoCache = (options: IOptions): Repository =>
  klawSync(options.path)
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
    )
    .reduce(
      (repository, { id, stats }) => {
        const metaData = getMetaData({ id, options });

        repository.cache.set(id, {
          id,
          metaData,
          ...(stats.isFile()
            ? {
                __typename: "File",
                contentType: extname(id),
                thumbImageUrl:
                  process.env.THUMBOR_URL +
                  `/unsafe/${process.env.THUMBS_LENGTH}x${process.env.THUMBS_WIDTH}/` +
                  encodeURIComponent(
                    process.env.DOCKER_NETWORK_PICREPO_URL + id
                  ),
                imageUrl: process.env.IMG_CDN_URL + id
              }
            : { __typename: "Folder" })
        });

        metaData?.tags?.forEach(tag => repository.tags.add(tag));
        metaData?.attributes?.forEach(attribute =>
          repository.attributes.add(attribute[0])
        );

        return repository;
      },
      {
        tags: new Set<string>(),
        attributes: new Set<string>(),
        cache: new Map<ID, Entry>()
      }
    );
