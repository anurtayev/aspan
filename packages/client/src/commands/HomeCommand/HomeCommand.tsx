import React from "react";
import { ReactComponent as Icon } from "./Icon.svg";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";

const ROOT_FOLDER = "/";

export default () => {
  const navigateToFolder = useUpdateLocalState();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, displayComponent } = data;
  if (id === "/") return null;

  return (
    <Icon
      onClick={() => {
        navigateToFolder({
          displayComponent: ROUTE_REGISTRY.Folder,
          prevDisplayComponent: displayComponent,
          id: ROOT_FOLDER,
          prevId: id,
          scrollY: window.scrollY,
        });
      }}
    />
  );
};
