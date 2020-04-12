import FileSystemDataSource from "../datasources/FileSystemDataSource";
import { FolderElement } from "../schema";

const ROOT_FOLDER_ID = "/";

const metaDataResolver = (
  _: any,
  { id }: { id: string },
  { dataSources }: { dataSources: { fs: FileSystemDataSource } }
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

export const resolvers = {
  Query: {
    getRootFolderEntries(
      _: any,
      __: any,
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(ROOT_FOLDER_ID);
    },
    getFolderEntries(
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(id);
    }
  },

  Folder: {
    metaData: metaDataResolver,
    children(
      { id }: { id: string },
      _: any,
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(id);
    }
  },

  File: {
    metaData: metaDataResolver,
    thumbImage(
      { id }: { id: string },
      _: any,
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getBase64ThumbString(id);
    }
  },

  FolderElement: {
    __resolveType: folderElementTypeResolver
  },

  Entry: {
    __resolveType: folderElementTypeResolver
  }
};
