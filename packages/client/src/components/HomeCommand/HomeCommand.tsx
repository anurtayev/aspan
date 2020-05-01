import React from "react";
import { ReactComponent as Icon } from "./Icon.svg";
import { useNavigateToFolder } from "globalUtil";

const ROOT_FOLDER = "/";

export default () => {
  const navigateToFolder = useNavigateToFolder();

  return (
    <Icon
      onClick={() => {
        navigateToFolder({ id: ROOT_FOLDER });
      }}
    />
  );
};
