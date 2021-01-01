import gql from "graphql-tag";

export const GET_METADATA = gql`
  query GetMetaData($id: String!) {
    entry(id: $id) {
      ... on Entry {
        __typename
        id
        metaData {
          tags
          attributes
        }
      }
    }

    tags

    attributes
  }
`;

export const SET_METADATA = gql`
  mutation SetMetaData($id: String!, $metaData: MetaDataInput!) {
    setMetaData(id: $id, metaData: $metaData) {
      tags
      attributes
    }
  }
`;
