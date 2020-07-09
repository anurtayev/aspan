import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LocalStateParams, ROUTE_REGISTRY, COMMAND_REGISTRY } from "./types";

export function useLocalState() {
  const APP_STATE = gql`
    query GetLocalState {
      displayComponent @client
      id @client
      scrollY @client
      prevDisplayComponent @client
      prevId @client
      prevScrollY @client
    }
  `;

  return useQuery(APP_STATE);
}

export const useUpdateLocalState = () => {
  const client = useApolloClient();

  return (data: LocalStateParams) => {
    client.writeData({
      data,
    });
  };
};

const routeCommands = {
  [ROUTE_REGISTRY.folder]: [
    COMMAND_REGISTRY.home,
    COMMAND_REGISTRY.back,
    COMMAND_REGISTRY.favorite,
  ],
  [ROUTE_REGISTRY.image]: [
    COMMAND_REGISTRY.meta,
    COMMAND_REGISTRY.favorite,
    COMMAND_REGISTRY.home,
  ],
  [ROUTE_REGISTRY.meta]: [COMMAND_REGISTRY.back],
};

export const useCommands = () => {
  const { loading, error, data } = useLocalState();
  const { displayComponent } = data;

  return {
    loading,
    error,
    data: loading ? null : routeCommands[displayComponent as ROUTE_REGISTRY],
  };
};
