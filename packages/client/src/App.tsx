import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Router from "./Router";

const AppFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  background: green;
`;

export default () => (
  <AppFrame>
    <Nav />
    <Router />
  </AppFrame>
);
