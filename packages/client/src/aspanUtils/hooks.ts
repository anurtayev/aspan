import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ROUTE_REGISTRY, ID } from "./types";

export function useLocalState() {
  const APP_STATE = gql`
    query GetLocalState {
      displayComponent @client
      id @client
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
      },
    });
};
