import React from "react";
import { ReactComponent as Icon } from "./Back.svg";
import { useUpdateLocalState, useLocalState } from "aspanUtils";

export default () => {
  const navigateToFolder = useUpdateLocalState();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, prevId, displayComponent, prevDisplayComponent } = data;

  if (id === "/") return null;

  return (
    <Icon
      onClick={() => {
        navigateToFolder({
          displayComponent: prevDisplayComponent,
          prevDisplayComponent: displayComponent,
          id: prevId,
          prevId: id,
          scrollY: window.scrollY,
        });
      }}
    />
  );
};
