import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Maybe from "graphql/tsutils/Maybe";

export type Entry = {
  id: string;
  metaData?: Maybe<MetaData>;
  name: string;
  parent: string;
};

export type FolderElement = File | Folder;

export type File = Entry & {
  __typename: "File";
  metaData?: Maybe<MetaData>;
  size: number;
  thumbImageUrl: string;
  imageUrl: string;
  contentType: string;
};

export type Folder = Entry & {
  __typename: "Folder";
  metaData?: Maybe<MetaData>;
  children?: Maybe<Array<FolderElement>>;
};

export type MetaData = {
  __typename?: "MetaData";
  tags?: Maybe<Array<string>>;
  attributes?: Maybe<Array<Array<string>>>;
  title?: Maybe<string>;
  description?: Maybe<string>;
};

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
    parentFolderEntries,
  }: {
    id: string;
    parentFolderEntries: FolderElement[];
  }) =>
    client.writeData({
      data: {
        displayComponent: ROUTE_REGISTRY.Image,
        id,
        parentFolderEntries,
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
