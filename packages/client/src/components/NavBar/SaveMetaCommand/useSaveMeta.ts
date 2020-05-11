import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default () => {
  const APP_STATE = gql`
    query GetLocalState {
      displayComponent @client
      id @client
      commands
    }
  `;

  return useQuery(APP_STATE);
};
