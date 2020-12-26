import React from "react";
import { useHistory } from "react-router-dom";

import { Frame, IconFrame, PaddedSpan } from "./Folder.styles";

type FolderParams = { id: string };

export const Folder = ({ id }: FolderParams) => {
  const history = useHistory();

  return (
    <Frame
      onClick={() => {
        history.push("/folder" + id);
      }}
    >
      <IconFrame>&#x1F4C1;</IconFrame>
      <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
    </Frame>
  );
};
