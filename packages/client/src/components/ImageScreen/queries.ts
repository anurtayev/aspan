import gql from "graphql-tag";

export const GET_ENTRY = gql`
  query GetEntry($id: String!) {
    entry(id: $id) {
      ... on Entry {
        __typename
        id
      }
      ... on File {
        thumbImageUrl
        imageUrl
        prev
        next
      }
    }
  }
`;
