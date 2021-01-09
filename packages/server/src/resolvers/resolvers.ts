import { FolderElement, Resolvers } from "../generated/graphql";
import { IContext } from "../util";

const metaData = (
  { id }: { id: string },
  _: any,
  { dataSources }: IContext
) => {
  return dataSources.fs.getMetaData(id);
};

const folderElementTypeResolver = (obj: FolderElement, _: any, __: any) => {
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
      { id, filterMetaData },
      {
        dataSources: {
          fs: { getFolderEntries, getEntry, findEntries }
        }
      }
    ) {
      if (id && id.startsWith("/")) {
        return (id === "/"
        ? true
        : getEntry(id))
          ? getFolderEntries(id, filterMetaData)
          : null;
      } else {
        if (!id && !filterMetaData) {
          throw new Error(
            "Either idSubstring or filterMetaData must be specified"
          );
        }
        return findEntries(id, filterMetaData);
      }
    },

    entry(_, { id }, { dataSources }) {
      return dataSources.fs.getEntry(id);
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
    metaData,
    children({ id }, _, { dataSources }) {
      return dataSources.fs.getFolderEntries(id, undefined);
    }
  },

  File: {
    metaData
  },

  FolderElement: {
    __resolveType: folderElementTypeResolver
  },

  Entry: {
    __resolveType: folderElementTypeResolver
  }
};
