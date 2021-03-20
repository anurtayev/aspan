import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query Repo($id: String, $metaDataInput: MetaDataInput) {
    entries(id: $id, metaDataInput: $metaDataInput) {
      ... on AbstractEntry {
        __typename
        id
        metaData {
          tags
          attributes
        }
      }
      ... on File {
        thumbImageUrl
        imageUrl
        prev
        next
      }
    }

    tags

    attributes
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
