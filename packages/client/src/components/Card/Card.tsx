import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  width: 20em;
  height: 10em;
  border: 1px solid black;
  border-radius: 0.5em;
  margin: 1em 0 0 1em;
`;

const FolderFrame = styled(Frame)`
  background: lightblue;
`;

export default ({
  id,
  __typename,
  base,
  client,
  thumbImageUrl,
  imageUrl,
}: {
  id: string;
  __typename: string;
  thumbImageUrl: string;
  imageUrl: string;
  base: string;
  client: any;
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
      {id}
    </FolderFrame>
  ) : (
    <Frame
      onClick={() => {
        // eslint-disable-next-line
        location.href = imageUrl;
      }}
    >
      <img src={thumbImageUrl} alt="thumb"></img>
    </Frame>
  );
