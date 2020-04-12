import FileSystemDataSource from "../datasources/FileSystemDataSource";

const ROOT_FOLDER_ID = "/";

const metaData = (
  _: any,
  { id }: { id: string },
  { dataSources }: { dataSources: { fs: FileSystemDataSource } }
) => {
  return dataSources.fs.getMetaData(id);
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
    metaData,
    children(
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(id);
    }
  },

  File: {
    metaData,
    thumbImage(
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getBase64ThumbString(id);
    }
  }
};
