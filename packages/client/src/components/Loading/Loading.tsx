import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  flex-grow: 1;
  margin: 1em;
  border: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CenteredParagraph = styled.p`
  text-align: center;
  font-size: 3em;
`;

export default ({ message = "" }: { message?: string }) => (
  <Frame>
    <CenteredParagraph>Loading...</CenteredParagraph>
  </Frame>
);
