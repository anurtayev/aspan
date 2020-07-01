import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  flex-grow: 1;
  margin: 1em;
  border: solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CenteredParagraph = styled.p`
  text-align: center;
  font-size: 3em;
`;

export const Error = ({ message = "" }: { message?: string }) => (
  <Frame>
    <CenteredParagraph>Error... {message}</CenteredParagraph>
  </Frame>
);
