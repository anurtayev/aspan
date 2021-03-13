import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query GetEntries($folderId: String!) {
    entries(folderId: $folderId) {
      ... on AbstractEntry {
        __typename
        id
      }
      ... on File {
        thumbImageUrl
        imageUrl
      }
    }
  }
`;
