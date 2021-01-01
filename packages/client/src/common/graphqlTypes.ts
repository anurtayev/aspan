/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFolderEntries
// ====================================================

export interface GetFolderEntries_entries_Folder {
  __typename: "Folder";
  id: string;
}

export interface GetFolderEntries_entries_File {
  __typename: "File";
  id: string;
  thumbImageUrl: string;
  imageUrl: string;
}

export type GetFolderEntries_entries = GetFolderEntries_entries_Folder | GetFolderEntries_entries_File;

export interface GetFolderEntries {
  /**
   * return values:
   *   - null if no such folder
   *   - empty array if folder is empty
   *   - Array of FolderElement otherwise
   */
  entries: GetFolderEntries_entries[] | null;
}

export interface GetFolderEntriesVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEntry
// ====================================================

export interface GetEntry_entry_Folder {
  __typename: "Folder";
  id: string;
}

export interface GetEntry_entry_File {
  __typename: "File";
  id: string;
  thumbImageUrl: string;
  imageUrl: string;
  prev: string | null;
  next: string | null;
}

export type GetEntry_entry = GetEntry_entry_Folder | GetEntry_entry_File;

export interface GetEntry {
  /**
   * return values:
   *   - null if no such entry
   *   - FolderElement otherwise
   */
  entry: GetEntry_entry | null;
}

export interface GetEntryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMetaData
// ====================================================

export interface GetMetaData_entry_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface GetMetaData_entry {
  __typename: "File" | "Folder";
  id: string;
  metaData: GetMetaData_entry_metaData | null;
}

export interface GetMetaData {
  /**
   * return values:
   *   - null if no such entry
   *   - FolderElement otherwise
   */
  entry: GetMetaData_entry | null;
  /**
   * returns list of all tags used in repository
   */
  tags: string[];
  /**
   * returns list of all attributes used in repository
   */
  attributes: string[];
}

export interface GetMetaDataVariables {
  id: string;
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
  metaData: MetaDataInput;
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
