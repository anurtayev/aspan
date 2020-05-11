import gql from "graphql-tag";

export const getMetaData = (id: string) => gql`
  query getMetaData {
    getEntry(id: "${id}") {
      ... on Entry {
        __typename
        id
        name
        metaData {
          tags
          attributes
          title
          description
        }
      }
    }
  }
`;
