/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repo
// ====================================================

export interface Repo_entries_Folder_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface Repo_entries_Folder {
  __typename: "Folder";
  id: string;
  metaData: Repo_entries_Folder_metaData | null;
}

export interface Repo_entries_File_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface Repo_entries_File {
  __typename: "File";
  id: string;
  metaData: Repo_entries_File_metaData | null;
  thumbImageUrl: string;
  imageUrl: string;
  prev: string | null;
  next: string | null;
}

export type Repo_entries = Repo_entries_Folder | Repo_entries_File;

export interface Repo {
  entries: Repo_entries[];
  /**
   * returns list of all tags used in repository
   */
  tags: string[];
  /**
   * returns list of all attributes used in repository
   */
  attributes: string[];
}

export interface RepoVariables {
  id?: string | null;
  metaDataInput?: MetaDataInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetMetaData
// ====================================================

export interface SetMetaData_setMetaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface SetMetaData {
  setMetaData: SetMetaData_setMetaData | null;
}

export interface SetMetaDataVariables {
  id: string;
  metaDataInput: MetaDataInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface MetaDataInput {
  tags?: string[] | null;
  attributes?: string[][] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
