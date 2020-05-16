import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query GetFolderEntries($id: String!) {
    getFolderEntries(id: $id) {
      ... on Entry {
        __typename
        id
        name
        parent
      }
      ... on File {
        thumbImageUrl
        imageUrl
      }
    }
  }
`;
