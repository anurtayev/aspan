import React from "react";
import { useQuery } from "@apollo/client";

import { GetFolderEntries, GetFolderEntriesVariables } from "common";
import { FOLDER_ENTRIES } from "./queries";

export const Folder = () => {
  const { loading, error, data } = useQuery<
    GetFolderEntries,
    GetFolderEntriesVariables
  >(FOLDER_ENTRIES, { variables: { id: "/" } });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entries) return <p>Error. No such folder</p>;

  const { entries } = data;

  return <div>{JSON.stringify(entries)}</div>;
};
