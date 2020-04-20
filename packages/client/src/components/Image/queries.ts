import gql from "graphql-tag";

export const getEntry = (id: string) => gql`
  {
    getEntry(id: "${id}") {
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
