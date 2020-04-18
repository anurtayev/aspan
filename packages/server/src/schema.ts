import { gql } from "apollo-server";
import Maybe from "graphql/tsutils/Maybe";

const schema = gql`
  type MetaData {
    tags: [String!]
    attributes: [[String!]!]
    title: String
    description: String
  }

  interface Entry {
    id: ID!
    metaData: MetaData
  }

  type Folder implements Entry {
    id: ID!
    metaData: MetaData

    children: [Entry!]
  }

  type File implements Entry {
    id: ID!
    metaData: MetaData

    size: Int!
    thumbImageUrl: String!
    imageUrl: String!
    contentType: String!
  }

  union FolderElement = File | Folder

  type Query {
    getRootFolderEntries: [FolderElement!]
    getFolderEntries(id: String!): [FolderElement!]
  }

  type Mutation {
    """
    Adds new tag to a folder entry. If element does
    exist it returns updated metadata object or null
    otherwise.
    """
    addTag(id: String!, tag: String!): MetaData
    removeTag(id: String!, tag: String!): MetaData
    addAttribute(id: String!, attribute: [String!]!): MetaData
    removeAttribute(id: String!, attributeKey: String!): MetaData
  }
`;

export default schema;

export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };

export type Entry = {
  id: string;
  metaData?: Maybe<MetaData>;
};

export type FolderElement = File | Folder;

export type File = Entry & {
  __typename: "File";
  id: string;
  metaData?: Maybe<MetaData>;
  size: number;
  thumbImage?: Maybe<string>;
  contentType: string;
};

export type Folder = Entry & {
  __typename: "Folder";
  id: string;
  metaData?: Maybe<MetaData>;
  children?: Maybe<Array<FolderElement>>;
};

export type MetaData = {
  __typename?: "MetaData";
  tags?: Maybe<Array<string>>;
  attributes?: Maybe<Array<Array<string>>>;
  title?: Maybe<string>;
  description?: Maybe<string>;
};

export type Mutation = {
  __typename?: "Mutation";
  addTag?: Maybe<MetaData>;
  removeTag?: Maybe<MetaData>;
  addAttribute?: Maybe<MetaData>;
  removeAttribute?: Maybe<MetaData>;
};

export type MutationAddTagArgs = {
  id: string;
  tag: string;
};

export type MutationRemoveTagArgs = {
  id: string;
  tag: string;
};

export type MutationAddAttributeArgs = {
  id: string;
  attribute: Array<string>;
};

export type MutationRemoveAttributeArgs = {
  id: string;
  attributeKey: string;
};

export type Query = {
  __typename?: "Query";
  getRootFolderEntries?: Maybe<Array<FolderElement>>;
  getFolderEntries?: Maybe<Array<FolderElement>>;
};

export type QueryGetFolderEntriesArgs = {
  id: string;
};
