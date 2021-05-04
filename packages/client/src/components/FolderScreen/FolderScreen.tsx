import { useEffect, useRef } from "react";

import { useAspanContext } from "common";
import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const { savedScrollTopRef, slides } = useAspanContext();
  const folderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    folderRef.current &&
      folderRef.current.scrollTo(0, savedScrollTopRef.current);
  });

  return (
    <FolderScreenFrame ref={folderRef}>
      {slides.current.entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
