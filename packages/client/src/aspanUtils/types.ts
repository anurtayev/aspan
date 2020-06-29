export type Entry = {
  id: string;
  metaData?: MetaData;
  name: string;
};

export type FolderElement = File | Folder;

export type File = Entry & {
  __typename: "File";
  metaData?: MetaData;
  size: number;
  thumbImageUrl: string;
  imageUrl: string;
  contentType: string;
};

export type Folder = Entry & {
  __typename: "Folder";
  metaData?: MetaData;
  children?: Array<FolderElement>;
};

export type MetaData = {
  __typename: "MetaData";
  tags: Array<string> | null;
  attributes: Array<Array<string>> | null;
  title: string | null;
  description: string | null;
};

export type MetaDataForm = Omit<MetaData, "__typename"> & {
  favorite: boolean;
  print: boolean;
};

export type MetaDataInput = {
  tags?: Array<string>;
  attributes?: Array<Array<string>>;
  title?: string;
  description?: string;
};

export type ID = string;

export type LocalStateParams = {
  displayComponent: ROUTE_REGISTRY;
  id: ID;
  prevDisplayComponent: ROUTE_REGISTRY;
  prevId: ID;
  scrollY: number;
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
  FavoriteCommand,
}
