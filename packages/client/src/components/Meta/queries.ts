import gql from "graphql-tag";

export const META_DATA = gql`
  query getMetaDataQuery($id: String!) {
    getEntry(id: $id) {
      ... on Entry {
        __typename
        id
        metaData {
          tags
          attributes
        }
      }
    }
  }
`;

export const UPDATE_META_DATA = gql`
  mutation setMetaData($id: String!, $metaData: MetaDataInput!) {
    setMetaData(id: $id, metaData: $metaData) {
      tags
      attributes
    }
  }
`;
