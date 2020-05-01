import React from "react";
import styled from "styled-components";
import NavBar from "components/NavBar";
import Router from "./Router";

const AppFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default () => (
  <AppFrame>
    <NavBar />
    <Router />
  </AppFrame>
);
