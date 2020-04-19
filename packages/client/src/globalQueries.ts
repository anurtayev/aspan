import gql from "graphql-tag";

export const APP_STATE = gql`
  query GetLocalState {
    path @client
  }
`;
