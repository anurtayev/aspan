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

export default ({ id, __typename }: { id: string; __typename: string }) =>
  __typename === "Folder" ? (
    <FolderFrame>{id}</FolderFrame>
  ) : (
    <Frame>{id}</Frame>
  );
