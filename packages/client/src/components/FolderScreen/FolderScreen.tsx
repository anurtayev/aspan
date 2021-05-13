import { useEffect, useRef, useContext } from "react";

import { StateContext } from "common";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const { savedScrollTopRef, slides } = useContext(StateContext);
  const folderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    savedScrollTopRef &&
      folderRef.current &&
      folderRef.current.scrollTo(0, savedScrollTopRef.current);
  });

  return (
    <FolderScreenFrame
      ref={folderRef}
      onClick={() =>
        (savedScrollTopRef.current = folderRef.current?.scrollTop as number)
      }
    >
      {slides.entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
