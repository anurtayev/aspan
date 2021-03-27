import { useHistory } from "react-router-dom";

import { Characters } from "common";
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
      <IconFrame>{Characters.folder}</IconFrame>
      <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
    </Frame>
  );
};
