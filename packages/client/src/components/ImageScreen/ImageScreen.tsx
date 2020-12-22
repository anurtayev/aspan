import React from "react";
import { useLocation } from "react-router-dom";

import { Frame } from "./ImageScreen.styles";

const PATH_PREFIX = "/image";

export const ImageScreen = () => {
  const location = useLocation();
  const id = location.pathname.replace(PATH_PREFIX, "");

  return (
    <Frame>
      <img src={id} alt="" />
    </Frame>
  );
};
