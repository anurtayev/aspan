import React from "react";
import { ReactComponent as Icon } from "./Favorite.svg";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";

const FAVORITE_FOLDER = ":favorite";

export default () => {
  const updateLocalState = useUpdateLocalState();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, displayComponent } = data;

  return (
    <Icon
      onClick={() => {
        updateLocalState({
          displayComponent: ROUTE_REGISTRY.Folder,
          id: FAVORITE_FOLDER,
          scrollY: 0,
          prevDisplayComponent: displayComponent,
          prevId: id,
          prevScrollY: window.scrollY,
        });
      }}
    />
  );
};
