import React from "react";
import { ReactComponent as Icon } from "./Favorite.svg";
import { useNavigateToFolder, useLocalState } from "aspanUtils";

const FAVORITE_FOLDER = ":favorite";

export default () => {
  const navigateToFolder = useNavigateToFolder();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;
  if (id === "/") return null;

  return (
    <Icon
      onClick={() => {
        navigateToFolder(FAVORITE_FOLDER);
      }}
    />
  );
};
