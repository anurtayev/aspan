import { IResolvers, IFieldResolver } from "apollo-server";
import { IContext } from "../util";
import FileSystemDataSource from "../datasources/FileSystemDataSource";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";

const ROOT_FOLDER_ID = "/";

const getRootFolderEntries: IFieldResolver<any, IContext, any> = (
  _,
  __,
  { dataSources }
) => {
  const fs = <FileSystemDataSource>(<DataSources<IContext>>dataSources).fs;
  return fs.getFolderEntries(ROOT_FOLDER_ID);
};

const getFolderEntries: IFieldResolver<any, IContext, any> = (
  _,
  { id },
  { dataSources }
) => {
  const fs = <FileSystemDataSource>(<DataSources<IContext>>dataSources).fs;
  return fs.getFolderEntries(id);
};

const metaData: IFieldResolver<any, IContext, any> = (
  _,
  { id },
  { dataSources }
) => {
  const fs = <FileSystemDataSource>(<DataSources<IContext>>dataSources).fs;
  return fs.getMetaData(id);
};

const children: IFieldResolver<any, IContext, any> = (
  _,
  { id },
  { dataSources }
) => {
  const fs = <FileSystemDataSource>(<DataSources<IContext>>dataSources).fs;
  return fs.getFolderEntries(id);
};

const thumbImage: IFieldResolver<any, IContext, any> = (
  _,
  { id },
  { dataSources }
) => {
  const fs = <FileSystemDataSource>(<DataSources<IContext>>dataSources).fs;
  return fs.getBase64ThumbString(id);
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
