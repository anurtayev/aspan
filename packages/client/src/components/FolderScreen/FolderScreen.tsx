import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import {
  GetEntries,
  GetEntriesVariables,
  GetEntries_entries_File,
  GetEntries_entries_Folder,
  entryType,
  getId,
  AspanContext,
  GetEntries_entries,
} from "common";
import { FOLDER_ENTRIES } from "./queries";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

const parseQueryString = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  return {
    tags: params.getAll("tags"),
    attributes: params.getAll("attributes").map((elem) => elem.split(",")),
    scrollTop: Number(params.get("scrollTop")),
  };
};

export const FolderScreen = () => {
  const { pathname, search } = useLocation();
  const id = getId(pathname);
  const { tags, attributes, scrollTop } = parseQueryString(search);
  const divRef = React.createRef<HTMLDivElement>();
  const ctx = useContext(AspanContext);

  const { loading, error, data } = useQuery<GetEntries, GetEntriesVariables>(
    FOLDER_ENTRIES,
    {
      variables: {
        folderId: id,
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo(0, scrollTop);
    }
  }, [divRef, scrollTop]);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entries) return <p>Error. No such folder</p>;

  const { entries } = data;

  type PrevNext = { prev?: string; next?: string };
  const entriesWithPrevNext: Array<
    | (GetEntries_entries_File & PrevNext)
    | (GetEntries_entries_Folder & PrevNext)
  > = entries
    .sort((a, b) => {
      const aName = a.id.split("/").slice(-1);
      const bName = b.id.split("/").slice(-1);
      if (a.__typename === entryType.folder && b.__typename === entryType.file)
        return -1;
      if (a.__typename === entryType.file && b.__typename === entryType.folder)
        return 1;
      else if (aName < bName) return -1;
      else if (aName > bName) return 1;
      else return 0;
    })
    .reduce((accumulator, entry, index, entries) => {
      return [
        ...accumulator,
        {
          ...entry,
          prev:
            entry.__typename === entryType.file
              ? index === 0
                ? undefined
                : entries[index - 1].id
              : undefined,
          next:
            entry.__typename === entryType.file
              ? index === entries.length - 1
                ? undefined
                : entries[index + 1].id
              : undefined,
        },
      ];
    }, [] as Array<GetEntries_entries>);

  return (
    <FolderScreenFrame
      ref={divRef}
      onClick={() => {
        if (ctx && divRef.current) {
          const currentHistory = ctx.returnPositions[0];
          ctx.returnPositions[1]([
            ...currentHistory,
            {
              id,
              scrollTop: divRef.current.scrollTop,
              tags,
              attributes,
            },
          ]);
        }
      }}
    >
      {entriesWithPrevNext.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
