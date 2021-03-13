/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEntries
// ====================================================

export interface GetEntries_entries_Folder {
  __typename: "Folder";
  id: string;
}

export interface GetEntries_entries_File {
  __typename: "File";
  id: string;
  thumbImageUrl: string;
  imageUrl: string;
}

export type GetEntries_entries = GetEntries_entries_Folder | GetEntries_entries_File;

export interface GetEntries {
  entries: GetEntries_entries[] | null;
}

export interface GetEntriesVariables {
  folderId: string;
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
}

export type GetEntry_entry = GetEntry_entry_Folder | GetEntry_entry_File;

export interface GetEntry {
  entry: GetEntry_entry | null;
}

export interface GetEntryVariables {
  entryId: string;
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
  entryId: string;
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

// ====================================================
// GraphQL query operation: GetExistingMetaKeys
// ====================================================

export interface GetExistingMetaKeys {
  /**
   * returns list of all tags used in repository
   */
  tags: string[];
  /**
   * returns list of all attributes used in repository
   */
  attributes: string[];
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
