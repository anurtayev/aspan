import React from "react";
import { ReactComponent as Icon } from "./Back.svg";
import { useNavigateToFolder, useLocalState, parent } from "aspanUtils";

export default () => {
  const navigateToFolder = useNavigateToFolder();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;

  if (id === "/") return null;

  return (
    <Icon
      onClick={() => {
        navigateToFolder(parent(id));
      }}
    />
  );
};
