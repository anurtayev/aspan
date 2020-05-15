import FileSystemDataSource from "../datasources/FileSystemDataSource";
import { FolderElement, MetaData } from "../schema";

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

  Mutation: {
    addTag(
      _: any,
      { id, tag }: { id: string; tag: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.addTag(id, tag);
    },
    removeTag(
      _: any,
      { id, tag }: { id: string; tag: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.addTag(id, tag);
    },
    addAttribute(
      _: any,
      { id, attribute }: { id: string; attribute: [string] },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.addAttribute(id, attribute);
    },
    removeAttribute(
      _: any,
      { id, attributeKey }: { id: string; attributeKey: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.addTag(id, attributeKey);
    },
    setTitle(
      _: any,
      { id, title }: { id: string; title: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.setTitle(id, title);
    },
    setDescription(
      _: any,
      { id, description }: { id: string; description: string },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.setDescription(id, description);
    },
    setMetaData(
      _: any,
      { id, metaData }: { id: string; metaData: MetaData },
      { dataSources }: { dataSources: { fs: FileSystemDataSource } }
    ) {
      return dataSources.fs.setMetaData(id, metaData);
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
