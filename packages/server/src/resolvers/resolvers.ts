import {
  FolderElement,
  MutationAddAttributeArgs,
  MutationAddTagArgs,
  MutationRemoveAttributeArgs,
  MutationRemoveTagArgs,
  MutationSetDescriptionArgs,
  MutationSetMetaDataArgs,
  MutationSetTitleArgs,
  QueryGetEntryArgs,
  QueryGetFolderEntriesArgs,
  Resolvers
} from "../generated/graphql";
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
    getFolderEntries(
      _: any,
      { id }: QueryGetFolderEntriesArgs,
      { dataSources }: IContext
    ) {
      return id === ":favorite"
        ? dataSources.fs.findEntries(["favorite"])
        : dataSources.fs.getFolderEntries(id);
    },

    getEntry(_: any, { id }: QueryGetEntryArgs, { dataSources }: IContext) {
      return dataSources.fs.getEntry(id);
    },

    getFavorites(_: any, __: any, { dataSources }: IContext) {
      return dataSources.fs.findEntries(["favorite"]);
    }
  },

  Mutation: {
    addTag(_: any, { id, tag }: MutationAddTagArgs, { dataSources }: IContext) {
      return dataSources.fs.addTag(id, tag);
    },

    removeTag(
      _: any,
      { id, tag }: MutationRemoveTagArgs,
      { dataSources }: IContext
    ) {
      return dataSources.fs.removeTag(id, tag);
    },

    addAttribute(
      _: any,
      { id, attribute }: MutationAddAttributeArgs,
      { dataSources }: IContext
    ) {
      return dataSources.fs.addAttribute({ id, attribute });
    },

    removeAttribute(
      _: any,
      { id, attributeKey }: MutationRemoveAttributeArgs,
      { dataSources }: IContext
    ) {
      return dataSources.fs.addTag(id, attributeKey);
    },

    setMetaData(
      _: any,
      { id, metaData }: MutationSetMetaDataArgs,
      { dataSources }: IContext
    ) {
      return dataSources.fs.setMetaData(id, metaData);
    }
  },

  Folder: {
    metaData,
    children({ id }: { id: string }, _: any, { dataSources }: IContext) {
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
