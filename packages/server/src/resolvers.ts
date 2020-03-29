import { Resolvers, Entry } from "./generated/graphql";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { MyDataSources, Ctx, RepositoryOptions } from "./types";

const ROOT_FOLDER_ID = "/";

export const resolvers: Resolvers<Ctx> = {
  Query: {
    getRootFolderEntries(_, __, { dataSources }) {
      return dataSources.fs.getFolderEntries(ROOT_FOLDER_ID);
    },
    getFolderEntries(_, { id }, { dataSources }) {
      return dataSources.fs.getFolderEntries(id);
    }
  },

  Entry: {
    __resolveType(obj) {
      if (obj.type === "File") {
        return "File";
      } else {
        return "Folder";
      }
    }
  },

  Folder: {
    metaData(entry, _args, { dataSources }) {
      return dataSources.fs.getMetaData(entry.id);
    },

    children(entry, _args, { dataSources }) {
      return dataSources.fs.getFolderEntries(entry.id);
    }
  },

  File: {
    metaData(entry, _args, { dataSources }) {
      return dataSources.fs.getMetaData(entry.id);
    },

    thumbImage(entry, _args, { dataSources }) {
      return dataSources.fs.getBase64ThumbString(entry.id);
    }
  }
};
