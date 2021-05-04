import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query Slides($id: String, $metaDataInput: MetaDataInput) {
    entries(id: $id, metaDataInput: $metaDataInput) {
      ... on Folder {
        __typename
        id
      }
      ... on File {
        __typename
        id
        thumbImageUrl
        imageUrl
        prev
        next
      }
    }
  }
`;

export const SET_METADATA = gql`
  mutation SetMetaData($id: String!, $metaDataInput: MetaDataInput!) {
    setMetaData(id: $id, metaDataInput: $metaDataInput) {
      tags
      attributes
    }
  }
`;

export const GET_METADATA = gql`
  query GetMetaData($id: String!) {
    entry(id: $id) {
      ... on AbstractEntry {
        __typename
        id
        metaData {
          tags
          attributes
        }
      }
    }

    tags

    attributes
  }
`;

export const GET_REPO_METADATA = gql`
  query GetRepoMetaData {
    tags
    attributes
  }
`;
