import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import { GetEntries, GetEntriesVariables, entryType, getId } from "common";
import { FOLDER_ENTRIES } from "./queries";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

const parseQueryString = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  return {
    idSubstring: params.get("idSubstring"),
    tags: params.getAll("tags"),
    attributes: params.getAll("attributes").map((elem) => elem.split(",")),
  };
};

export const FolderScreen = () => {
  const { pathname, search } = useLocation();
  const id = getId(pathname);
  const { idSubstring, tags, attributes } = parseQueryString(search);

  const { loading, error, data } = useQuery<GetEntries, GetEntriesVariables>(
    FOLDER_ENTRIES,
    {
      variables: {
        id: id || idSubstring ? id || idSubstring : undefined,
        filterMetaData:
          (tags && tags.length > 0) || (attributes && attributes.length > 0)
            ? {
                tags: tags && tags.length > 0 ? tags : undefined,
                attributes:
                  attributes && attributes.length > 0 ? attributes : undefined,
              }
            : undefined,
      },
      fetchPolicy: "no-cache",
    }
  );

  if (id && idSubstring) return <p></p>;

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
