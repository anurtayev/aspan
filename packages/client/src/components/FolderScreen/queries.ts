import gql from "graphql-tag";

export const FOLDER_ENTRIES = gql`
  query GetEntries($id: String, $filterMetaData: MetaDataInput) {
    entries(id: $id, filterMetaData: $filterMetaData) {
      ... on Entry {
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
