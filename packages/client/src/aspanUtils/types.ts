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
