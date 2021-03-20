import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Characters, AspanContext } from "common";
import { Frame, IconFrame, PaddedSpan } from "./Folder.styles";

type FolderParams = { id: string };

export const Folder = ({ id }: FolderParams) => {
  const history = useHistory();
  const ctx = useContext(AspanContext);

  if (!ctx) throw new Error("no context");

  return (
    <Frame
      onClick={() => {
        ctx.setScrollTop(0);
        history.push("/folder" + id);
      }}
    >
      <IconFrame>{Characters.folder}</IconFrame>
      <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
    </Frame>
  );
};
