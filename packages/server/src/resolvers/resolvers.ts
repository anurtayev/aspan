import { Entry, Resolvers } from "../generated/graphql";
import { IContext } from "../util";

const metaData = (
  { id }: { id: string },
  _: any,
  { dataSources }: IContext
) => {
  return dataSources.fs.getMetaData(id);
};

const folderElementTypeResolver = (obj: Entry, _: any, __: any) => {
  if (obj.__typename === "File") {
    return "File";
  }
  if (obj.__typename === "Folder") {
    return "Folder";
  }
  return null;
};

export const resolvers: Resolvers<IContext> = {
  Query: {
    entries(
      _,
      { folderId, filterMetaData },
      {
        dataSources: {
          fs: { getEntries }
        }
      }
    ) {
      return getEntries(folderId, filterMetaData);
    },

    entry(_, { entryId }, { dataSources }) {
      if (!entryId) return null;

      return dataSources.fs.getEntry(entryId);
    },

    tags(_, __, { dataSources: { fs } }) {
      return fs.tags;
    },

    attributes(_, __, { dataSources: { fs } }) {
      return fs.attributes;
    }
  },

  Mutation: {
    addTag(_, { id, tag }, { dataSources }) {
      return dataSources.fs.addTag(id, tag);
    },

    removeTag(_, { id, tag }, { dataSources }) {
      return dataSources.fs.removeTag(id, tag);
    },

    addAttribute(_: any, { id, attribute }, { dataSources }) {
      return dataSources.fs.addAttribute({ id, attribute });
    },

    removeAttribute(_: any, { id, attributeKey }, { dataSources }) {
      return dataSources.fs.addTag(id, attributeKey);
    },

    setMetaData(_: any, { id, metaData }, { dataSources }) {
      return dataSources.fs.setMetaData(id, metaData);
    }
  },

  Folder: {
    metaData
  },

  File: {
    metaData
  },

  AbstractEntry: {
    __resolveType: folderElementTypeResolver
  },

  Entry: {
    __resolveType: folderElementTypeResolver
  }
};
