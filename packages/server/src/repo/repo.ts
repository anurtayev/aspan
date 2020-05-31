import { dirname, basename, extname } from "path";
import { FolderElement } from "../util";
import { MemoryRepo, MemoryRepoEntry } from "./repoCache";

export const getEntry = ({ id, cache }: { id: string; cache: MemoryRepo }) => {
  const rawEntry = cache.get(id);
  if (!rawEntry) return undefined;
  return expandEntry({ id, rawEntry });
};

export const expandEntry = ({
  id,
  rawEntry
}: {
  id: string;
  rawEntry: MemoryRepoEntry;
}): FolderElement => {
  const stats = rawEntry.stats;
  const contentType = extname(id);
  const name = basename(id, contentType);
  const parent = dirname(id);
  const dockerImageUrl = process.env.DOCKER_NETWORK_PICREPO_URL + id;
  const imageUrl = "http://localhost:8080" + id;

  return stats.isFile()
    ? {
        __typename: "File",
        id,
        size: stats.size,
        contentType,
        name,
        parent,
        thumbImageUrl:
          process.env.THUMBOR_URL +
          `/unsafe/${process.env.THUMBS_LENGTH}x${process.env.THUMBS_WIDTH}/` +
          encodeURIComponent(dockerImageUrl),
        imageUrl
      }
    : {
        __typename: "Folder",
        id,
        name,
        parent
      };
};

export const getFolderEntries = ({
  id,
  cache
}: {
  id: string;
  cache: MemoryRepo;
}): Array<FolderElement> | undefined => {
  const retVal: Array<FolderElement> = [];
  for (const [key, rawEntry] of cache) {
    if (basename(key) === id) {
      retVal.push(expandEntry({ id: key, rawEntry }));
    }
  }

  return retVal.length === 0 ? undefined : retVal;
};

export const findEntries = ({
  terms,
  cache
}: {
  terms: string[];
  cache: MemoryRepo;
}): Array<FolderElement> | undefined => {
  const retVal: Array<FolderElement> = [];
  for (const [key, rawEntry] of cache) {
    const { metaData } = rawEntry;
    if (!metaData) continue;

    const { title, description, tags, attributes } = metaData;

    const searchString =
      (title ? title : "") +
      (description ? description : "") +
      (tags ? tags.join() : "") +
      (attributes ? attributes.map(attr => attr.join()).join() : "");

    if (terms.every(term => searchString.includes(term))) {
      retVal.push(expandEntry({ id: key, rawEntry }));
    }
  }

  return retVal.length === 0 ? undefined : retVal;
};
