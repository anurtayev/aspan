import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query GetFolderEntries($id: String!) {
    folderEntries(id: $id) {
      ... on Entry {
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
