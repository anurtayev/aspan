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
}: {
  id: string;
  __typename: string;
  base: string;
  client: any;
}) =>
  __typename === "Folder" ? (
    <FolderFrame
      onClick={() => {
        const newPath =
          base === "/" ? id : `${base}/${id.split("/").slice(-1)[0]}`;
        console.log("==> 3 newPath", newPath);

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
    <Frame>{id}</Frame>
  );
