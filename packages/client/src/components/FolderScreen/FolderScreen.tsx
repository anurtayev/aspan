import React from "react";
import { useQuery } from "@apollo/client";

import {
  GetFolderEntries,
  GetFolderEntriesVariables,
  entryType,
  useEntryId,
} from "common";
import { FOLDER_ENTRIES } from "./queries";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const entryId = useEntryId();

  const { loading, error, data } = useQuery<
    GetFolderEntries,
    GetFolderEntriesVariables
  >(FOLDER_ENTRIES, {
    variables: { id: entryId || "/" },
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
