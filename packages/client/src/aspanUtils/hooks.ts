import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FolderElement } from "./types";

export enum ROUTE_REGISTRY {
  Folder,
  Image,
  Meta,
}

export enum COMMAND_REGISTRY {
  HomeCommand,
  BackCommand,
  MetaCommand,
}

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

export const FOLDER_COMMANDS = [
  COMMAND_REGISTRY.HomeCommand,
  COMMAND_REGISTRY.BackCommand,
];
export const useNavigateToFolder = () => {
  const client = useApolloClient();

  return ({ id, parent }: { id: string; parent?: string }) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Folder,
        id,
        commands: FOLDER_COMMANDS,
        parent,
      },
    });
};

export const useNavigateToImage = () => {
  const client = useApolloClient();

  return ({
    id,
    parentFolderImages,
  }: {
    id: string;
    parentFolderImages: FolderElement[];
  }) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Image,
        id,
        parentFolderImages,
      },
    });
};

export const useNavigateToMeta = () => {
  const client = useApolloClient();

  return ({ id }: { id: string }) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Meta,
        id,
      },
    });
};
