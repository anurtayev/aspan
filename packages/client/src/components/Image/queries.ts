import gql from "graphql-tag";

export const ENTRY_DATA = gql`
  query GetEntryData($id: String!) {
    getEntry(id: $id) {
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
