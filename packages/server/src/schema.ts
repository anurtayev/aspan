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
    name: String!
    parent: String
  }

  type Folder implements Entry {
    id: ID!
    metaData: MetaData
    name: String!
    parent: String

    children: [Entry!]
  }

  type File implements Entry {
    id: ID!
    metaData: MetaData
    name: String!
    parent: String

    size: Int!
    thumbImageUrl: String!
    imageUrl: String!
    contentType: String!
  }

  union FolderElement = File | Folder

  type Query {
    getFolderEntries(id: String!): [FolderElement!]
    getFolderEntries2(id: String!): FolderElement
    getEntry(id: String!): FolderElement
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

export type Entry = {
  id: string;
  metaData?: Maybe<MetaData>;
  name: string;
  parent: string;
};

export type FolderElement = File | Folder;

export type File = Entry & {
  __typename: "File";
  metaData?: Maybe<MetaData>;
  size: number;
  thumbImageUrl: string;
  imageUrl: string;
  contentType: string;
};

export type Folder = Entry & {
  __typename: "Folder";
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

export type Query = {
  __typename?: "Query";
  getFolderEntries?: Maybe<Array<FolderElement>>;
  getEntry?: Maybe<FolderElement>;
};
