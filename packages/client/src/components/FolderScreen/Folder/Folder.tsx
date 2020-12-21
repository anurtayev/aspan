import React from "react";
import { useHistory } from "react-router-dom";

import { FolderFrame, IconFrame } from "./Folder.styles";

type FolderParams = { id: string };

export const Folder = ({ id }: FolderParams) => {
  const history = useHistory();

  return (
    <FolderFrame
      onClick={() => {
        history.push("/folder" + id);
      }}
    >
      <IconFrame>&#x1F4C1;</IconFrame>
      {id}
    </FolderFrame>
  );
};
