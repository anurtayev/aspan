import { Entry, Resolvers } from "../generated/graphql";
import { IContext } from "../util";
import { Cache, ID, Repository, isFile, isFolder } from "../repo";

const metaData = (
  { id }: { id: string },
  _: any,
  { dataSources }: IContext
) => {
  return dataSources.fs.getMetaData(id);
};

export const resolvers: Resolvers<IContext> = {
  Query: {
    entries(
      _,
      { id, metaDataInput },
      {
        dataSources: {
          fs: { getEntries, search }
        }
      }
    ) {
      if (id) return getEntries(id);

      if (metaDataInput) return search(metaDataInput);

      return [];
    },

    entry(_, { id }, { dataSources }) {
      return dataSources.fs.getEntry(id);
    },

    tags(_, __, { dataSources: { fs } }) {
      return fs.tags;
    },

    attributes(_, __, { dataSources: { fs } }) {
      return fs.attributes;
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

    setMetaData(_: any, { id, metaDataInput }, { dataSources }) {
      return dataSources.fs.setMetaData(id, metaDataInput);
    }
  },

  Entry: {
    __resolveType: (obj, _: any, __: any) => {
      if (obj.__typename === "File") {
        return "File";
      }
      if (obj.__typename === "Folder") {
        return "Folder";
      }
      return null;
    }
  }
};
