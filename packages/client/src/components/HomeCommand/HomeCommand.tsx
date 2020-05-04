import React from "react";
import { ReactComponent as Icon } from "./Icon.svg";
import { useNavigateToFolder } from "aspanUtils";

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
