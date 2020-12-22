import React from "react";
import { Frame } from "./File.styles";
import { useHistory } from "react-router-dom";

type FileParams = { id: string; thumbImageUrl: string; imageUrl: string };

export const File = ({ id, thumbImageUrl, imageUrl }: FileParams) => {
  const history = useHistory();
  return (
    <Frame
      onClick={() => {
        history.push("/image" + id);
      }}
    >
      <img src={thumbImageUrl} alt="" />
    </Frame>
  );
};
