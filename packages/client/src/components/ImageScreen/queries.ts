import gql from "graphql-tag";

export const GET_ENTRY = gql`
  query GetEntry($entryId: String!) {
    entry(entryId: $entryId) {
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
