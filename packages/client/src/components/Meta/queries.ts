import gql from "graphql-tag";

export const META_DATA = gql`
  query getMetaData($id: String!) {
    getEntry(id: $id) {
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

export const UPDATE_META_DATA = gql`
  mutation setMetaData($id: String!, $metaData: MetaDataInput) {
    setMetaData(id: $id, metaData: $metaData) {
      title
      description
      tags
      attributes
    }
  }
`;
