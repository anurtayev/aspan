import React, { useContext, useEffect } from "react";

import { AspanContext } from "common";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const divRef = React.createRef<HTMLDivElement>();
  const ctx = useContext(AspanContext);

  const scrollTop = ctx?.scrollTop ? ctx.scrollTop : 0;

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo(0, scrollTop);
    }
  }, [divRef, scrollTop]);

  if (!ctx) return <p>Error</p>;

  return (
    <FolderScreenFrame
      ref={divRef}
      onClick={() =>
        ctx && divRef.current && ctx.setScrollTop(divRef.current.scrollTop)
      }
    >
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
