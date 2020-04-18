import FileSystemDataSource from "../datasources/FileSystemDataSource";
import { FolderElement } from "../schema";

const ROOT_FOLDER_ID = "/";

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
      { id }: { id: string },
      _: any,
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.getFolderEntries(id);
    }
  },

  File: {
    metaData,
    thumbImageUrl({ id }: { id: string }) {
      return (
        process.env.THUMBOR_URL +
        `/unsafe/150x150/` +
        // `/unsafe/${process.env.THUMBS_LENGTH}x${process.env.THUMBS_WIDTH}/` +
        encodeURIComponent(process.env.IMAGES_REPOSITORY_URL + id)
      );
    },
    imageUrl({ id }: { id: string }) {
      return `http://localhost:8080${id}`;
    }
  },

  FolderElement: {
    __resolveType: folderElementTypeResolver
  },

  Entry: {
    __resolveType: folderElementTypeResolver
  }
};
