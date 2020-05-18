export type Entry = {
  id: string;
  metaData?: MetaData;
  name: string;
  parent: string;
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
  tags?: Array<string>;
  attributes?: Array<Array<string>>;
  title?: string;
  description?: string;
};

export type MetaDataInput = Omit<MetaData, "__typename">;

export type MetaDataForm = MetaDataInput & {
  favorite?: boolean;
  print?: boolean;
};
