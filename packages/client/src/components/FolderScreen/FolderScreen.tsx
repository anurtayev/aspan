import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GetFolderEntries, GetFolderEntriesVariables } from "common";
import { FOLDER_ENTRIES } from "./queries";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

type FolderParams = { id: string };

export const FolderScreen = () => {
  const { id } = useParams<FolderParams>();
  const { loading, error, data } = useQuery<
    GetFolderEntries,
    GetFolderEntriesVariables
  >(FOLDER_ENTRIES, {
    variables: { id: id ? "/" + id : "/" },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entries) return <p>Error. No such folder</p>;

  const { entries } = data;

  return (
    <FolderScreenFrame>
      {entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
