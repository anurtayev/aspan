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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
