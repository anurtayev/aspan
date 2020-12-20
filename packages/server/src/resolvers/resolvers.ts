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
      { id },
      {
        dataSources: {
          fs: { findEntries, getFolderEntries, getEntry }
        }
      }
    ) {
      const folder = getEntry(id);

      // return id === ":favorite"
      // ? findEntries(["favorite"])
      // : getFolderEntries(id);

      return folder
        ? id === ":favorite"
          ? findEntries(["favorite"])
          : getFolderEntries(id)
        : null;
    },

    entry(_, { id }, { dataSources }) {
      return dataSources.fs.getEntry(id);
    },

    favorites(_, __, { dataSources }) {
      return dataSources.fs.findEntries(["favorite"]);
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
      return dataSources.fs.getFolderEntries(id);
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
