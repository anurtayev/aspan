import React from "react";
import { ReactComponent as Icon } from "./Back.svg";
import { useNavigateToFolder, useLocalState } from "aspanUtils";

export default () => {
  const navigateToFolder = useNavigateToFolder();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;

  if (id === "/") return null;

  const elements = id.split("/");
  const parentFolder =
    elements.length === 2 ? "/" : id.split("/").slice(0, -1).join("/");

  return (
    <Icon
      onClick={() => {
        navigateToFolder({ id: parentFolder });
      }}
    />
  );
};
