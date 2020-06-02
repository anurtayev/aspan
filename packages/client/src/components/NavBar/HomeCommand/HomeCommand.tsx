import React from "react";
import { ReactComponent as Icon } from "./Icon.svg";
import { useNavigateToFolder, useLocalState } from "aspanUtils";

const ROOT_FOLDER = "/";

export default () => {
  const navigateToFolder = useNavigateToFolder();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;
  if (id === "/") return null;

  return (
    <Icon
      onClick={() => {
        navigateToFolder(ROOT_FOLDER);
      }}
    />
  );
};
