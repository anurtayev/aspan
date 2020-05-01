import FileSystemDataSource from "../datasources/FileSystemDataSource";
import { FolderElement } from "../schema";

const metaData = (
  { id }: { id: string },
  _: any,
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
    getFolderEntries(
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(id);
    },
    getEntry(
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getEntry(id);
    }
  },

  Folder: {
    metaData,
    children(
      { id }: { id: string },
      _: any,
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
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
