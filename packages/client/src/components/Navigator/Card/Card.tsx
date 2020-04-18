import React from "react";
import styled from "styled-components";
import { ReactComponent as FolderIcon } from "./Folder.svg";

const MAX_CHARACTERS = 20;

const Frame = styled.div`
  width: 10em;
  height: 10em;
  border-radius: 0.5em;
  margin: 1em 0 0 1em;
`;

const ImageFrame = styled(Frame)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FolderFrame = styled(Frame)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: lightblue;
`;

const SlimParagraph = styled.div`
  margin: 0;
`;

export default ({
  id,
  __typename,
  base,
  client,
  thumbImageUrl,
  imageUrl,
  name,
}: {
  id: string;
  __typename: string;
  thumbImageUrl: string;
  imageUrl: string;
  base: string;
  client: any;
  name: string;
}) =>
  __typename === "Folder" ? (
    <FolderFrame
      onClick={() => {
        const newPath =
          base === "/" ? id : `${base}/${id.split("/").slice(-1)[0]}`;

        client.writeData({
          data: {
            path: newPath,
          },
        });
      }}
    >
      <FolderIcon></FolderIcon>
      <SlimParagraph>
        {name.length > MAX_CHARACTERS
          ? name.slice(0, MAX_CHARACTERS) + "\u2026"
          : name}
      </SlimParagraph>
    </FolderFrame>
  ) : (
    <ImageFrame
      onClick={() => {
        // eslint-disable-next-line
        location.href = imageUrl;
      }}
    >
      <img src={thumbImageUrl} alt="thumb"></img>
    </ImageFrame>
  );