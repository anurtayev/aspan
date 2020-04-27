import React from "react";
import styled from "styled-components";
import { useLocalState } from "globalUtil";
import NavBar from "components/NavBar";
import Folder from "components/Folder";
import Image from "components/Image";
import Meta from "components/Meta";
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
