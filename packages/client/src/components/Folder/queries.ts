import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query GetFolderEntries($id: String!) {
    getFolderEntries(id: $id) {
      ... on Entry {
        __typename
        id
        name
      }
      ... on File {
        thumbImageUrl
        imageUrl
      }
    }
  }
`;
