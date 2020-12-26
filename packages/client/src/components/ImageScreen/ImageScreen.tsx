import React from "react";
import { useHistory } from "react-router-dom";

import { Frame, Image } from "./ImageScreen.styles";
import { pathPrefix, useEntryId } from "common";

export const ImageScreen = () => {
  const history = useHistory();
  const entryId = useEntryId();

  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + entryId}
        alt=""
        onClick={() => {
          history.push(
            pathPrefix.folder + entryId.split("/").slice(0, -1).join("/")
          );
        }}
      />
    </Frame>
  );
};
