import gql from "graphql-tag";

export function getFolderEntries(id: string) {
  return gql`
  {
    getFolderEntries(id: "${id}") {
      ... on Entry {
        __typename
        id
      }
    }
  }
`;
}

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    path @client
  }
`;
