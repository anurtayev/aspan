import gql from "graphql-tag";

export const GET_EXISTING_META_KEYS = gql`
  query GetExistingMetaKeys {
    tags
    attributes
  }
`;
