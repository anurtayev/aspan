import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ROUTE_REGISTRY, COMMAND_REGISTRY, ID } from "./types";

export function useLocalState() {
  const APP_STATE = gql`
    query GetLocalState {
      displayComponent @client
      id @client
      commands
    }
  `;

  return useQuery(APP_STATE);
}

export const useNavigateToFolder = () => {
  const client = useApolloClient();

  return (id: ID) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Folder,
        id,
        commands: [COMMAND_REGISTRY.HomeCommand, COMMAND_REGISTRY.BackCommand],
      },
    });
};

export const useNavigateToImage = () => {
  const client = useApolloClient();

  return (id: ID) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Image,
        id,
        commands: [COMMAND_REGISTRY.MetaCommand],
      },
    });
};

export const useNavigateToMeta = () => {
  const client = useApolloClient();

  return (id: ID) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Meta,
        id,
        commands: [COMMAND_REGISTRY.CancelMetaCommand],
      },
    });
};
