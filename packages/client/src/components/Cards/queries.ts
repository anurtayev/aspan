import gql from "graphql-tag";

export function getFolderEntries(id: string) {
  return gql`
  {
    getFolderEntries(id: "${id}") {
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
}
