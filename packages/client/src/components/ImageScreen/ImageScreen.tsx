import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Frame, Image } from "./ImageScreen.styles";
import { pathPrefix } from "common";

export const ImageScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.replace(pathPrefix.image, "");

  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + id}
        alt=""
        onClick={() => {
          history.push(
            pathPrefix.folder + id.split("/").slice(0, -1).join("/")
          );
        }}
      />
    </Frame>
  );
};
