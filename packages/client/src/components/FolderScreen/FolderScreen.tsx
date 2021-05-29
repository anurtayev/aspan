import { useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";

import { StateContext } from "common";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const ctx = useContext(StateContext);
  const folderRef = useRef<HTMLDivElement>(null);
  const { pathname, search } = useLocation();

  useEffect(() => {
    folderRef.current &&
      folderRef.current.scrollTo(
        0,
        ctx.savedScrollTops.get(pathname + search) || 0
      );
  });

  return (
    <FolderScreenFrame
      ref={folderRef}
      onClick={() => {
        ctx.savedScrollTops.set(
          pathname + search,
          folderRef.current?.scrollTop as number
        );
      }}
    >
      {ctx.slides.entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
