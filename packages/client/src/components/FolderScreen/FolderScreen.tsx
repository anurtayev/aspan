import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

import {
  GetEntries,
  GetEntriesVariables,
  entryType,
  getId,
  AspanContext,
} from "common";
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
    scrollTop: Number(params.get("scrollTop")),
  };
};

export const FolderScreen = () => {
  const { pathname, search } = useLocation();
  const id = getId(pathname);
  const { idSubstring, tags, attributes, scrollTop } = parseQueryString(search);
  const divRef = React.createRef<HTMLDivElement>();
  const ctx = useContext(AspanContext);

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

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo(0, scrollTop);
    }
  }, [divRef, scrollTop]);

  if (id && idSubstring) return <p></p>;

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entries) return <p>Error. No such folder</p>;

  const { entries } = data;

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
              idSubstring,
              tags,
              attributes,
            },
          ]);
        }
      }}
    >
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
