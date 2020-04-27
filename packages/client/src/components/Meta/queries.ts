import gql from "graphql-tag";

export const getMetaData = (id: string) => gql`
  {
    getEntry(id: "${id}") {
      ... on Entry {
        __typename
        id
        name
      }
      ... on File {
        thumbImageUrl
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
