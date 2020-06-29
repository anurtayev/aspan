import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LocalStateParams } from "./types";

export function useLocalState() {
  const APP_STATE = gql`
    query GetLocalState {
      displayComponent @client
      id @client
      prevDisplayComponent @client
      prevId @client
      scrollY @client
    }
  `;

  return useQuery(APP_STATE);
}

export const useUpdateLocalState = () => {
  const client = useApolloClient();

  return (data: LocalStateParams) =>
    client.writeData({
      data,
    });
};
