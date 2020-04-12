import { IResolvers, IFieldResolver } from "apollo-server";
import { IContext } from "../util";

const ROOT_FOLDER_ID = "/";

const getRootFolderEntries: IFieldResolver<any, any, any> = (
  _,
  __,
  { dataSources }
) => {
  return dataSources.fs.getFolderEntries(ROOT_FOLDER_ID);
};

const getFolderEntries: IFieldResolver<any, any, any> = (
  _,
  { id },
  { dataSources }
) => {
  return dataSources.fs.getFolderEntries(id);
};

const metaData: IFieldResolver<any, any, any> = (
  _,
  { id },
  { dataSources }
) => {
  return dataSources.fs.getMetaData(id);
};

const children: IFieldResolver<any, any, any> = (
  _,
  { id },
  { dataSources }
) => {
  return dataSources.fs.getFolderEntries(id);
};

const thumbImage: IFieldResolver<any, any, any> = (
  _,
  { id },
  { dataSources }
) => {
  return dataSources.fs.getBase64ThumbString(id);
};

export const resolvers: IResolvers<any, IContext> = {
  Query: {
    getRootFolderEntries,
    getFolderEntries
  },

  Folder: {
    metaData,
    children
  },

  File: {
    metaData,

    thumbImage
  }
};
