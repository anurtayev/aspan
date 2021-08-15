import { useHistory } from "react-router-dom";

import { Frame, PaddedSpan } from "./Folder.styles";

type FolderParams = { id: string };

export const Folder = ({ id }: FolderParams) => {
  const history = useHistory();

  return (
    <Frame
      onClick={() => {
        history.push("/folder" + id);
      }}
    >
      <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
    </Frame>
  );
};
