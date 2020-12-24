import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import { GetFolderEntries, GetFolderEntriesVariables, entryType } from "common";
import { FOLDER_ENTRIES } from "./queries";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

const FOLDER_PATH_PREFIX = "/folder";

export const FolderScreen = () => {
  const location = useLocation();
  const id = location.pathname.replace(FOLDER_PATH_PREFIX, "");

  const { loading, error, data } = useQuery<
    GetFolderEntries,
    GetFolderEntriesVariables
  >(FOLDER_ENTRIES, {
    variables: { id: id || "/" },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entries) return <p>Error. No such folder</p>;

  const { entries } = data;

  return (
    <FolderScreenFrame>
      {entries
        .sort((a, b) => {
          if (
            a.__typename === entryType.folder &&
            b.__typename === entryType.file
          )
            return -1;
          else if (
            a.__typename === entryType.file &&
            b.__typename === entryType.folder
          )
            return 1;
          else if (a.id < b.id) return -1;
          else if (a.id > b.id) return 1;
          else return 0;
        })
        .map((entry) =>
          entry.__typename === "File" ? (
            <File key={entry.id} {...entry} />
          ) : (
            <Folder key={entry.id} {...entry} />
          )
        )}
    </FolderScreenFrame>
  );
};
