import { gql } from "apollo-server";

const schema = gql`
  input MetaDataInput {
    tags: [String!]
    attributes: [[String!]!]
    title: String
    description: String
  }

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
    getFavorites: [FolderElement!]
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
    setTitle(id: String!, title: String!): MetaData
    setDescription(id: String!, description: String!): MetaData
    setMetaData(id: String!, metaData: MetaDataInput!): MetaData
  }
`;

export default schema;
