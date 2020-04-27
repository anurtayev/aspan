import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Maybe from "graphql/tsutils/Maybe";

export type Entry = {
  id: string;
  metaData?: Maybe<MetaData>;
  name: string;
};

export type FolderElement = File | Folder;

export type File = Entry & {
  __typename: "File";
  id: string;
  metaData?: Maybe<MetaData>;
  size: number;
  thumbImage?: Maybe<string>;
  contentType: string;
};

export type Folder = Entry & {
  __typename: "Folder";
  id: string;
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

export enum routes {
  Folder,
  Image,
  Meta,
}

export enum commands {
  GoHome,
  GoBack,
  GoMeta,
  GoNextImage,
  GoPreviousImage,
}

export function useLocalState() {
  const APP_STATE = gql`
    query GetLocalState {
      id @client
    }
  `;

  const { data } = useQuery(APP_STATE);

  return data;
}

export const useNavigateToFolder = () => {
  const client = useApolloClient();

  return (id: string) =>
    client.writeData({
      data: {
        displayComponent: routes.Folder,
        id,
        commands: [],
      },
    });
};

export const useNavigateToImage = () => {
  const client = useApolloClient();

  return (id: string, entries: FolderElement[]) =>
    client.writeData({
      data: {
        displayComponent: routes.Image,
        id,
        entries,
      },
    });
};

export const useNavigateToMeta = () => {
  const client = useApolloClient();

  return (id: string) =>
    client.writeData({
      data: {
        displayComponent: routes.Meta,
        id,
      },
    });
};
