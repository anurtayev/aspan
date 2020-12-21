import React from "react";
import { FileFrame } from "./File.styles";

type FileParams = { id: string; thumbImageUrl: string; imageUrl: string };

export const File = ({ id, thumbImageUrl, imageUrl }: FileParams) => {
  return (
    <FileFrame>
      <img src={thumbImageUrl} alt="" />
    </FileFrame>
  );
};
