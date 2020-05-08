import React from "react";
import styled from "styled-components";

const FlexImage = styled.div`
  border: 1px solid black;
  margin: 1em 1em 0 1em;
`;

export default ({ id }: { id: string }) => {
  return <FlexImage>META</FlexImage>;
};
