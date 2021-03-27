import React, { useContext, useEffect } from "react";

import { AspanContext } from "common";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const ctx = useContext(AspanContext);

  useEffect(() => {
    if (ctx?.folderScreenRef.current) {
      ctx.folderScreenRef.current.scrollTo(0, ctx.scrollTop);
    }
  }, [ctx]);

  if (!ctx) return <p>Error</p>;

  return (
    <FolderScreenFrame ref={ctx.folderScreenRef}>
      {ctx.repo.entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
