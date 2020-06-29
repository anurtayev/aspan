import React from "react";
import { ReactComponent as Icon } from "./Configuration.svg";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";

export default () => {
  const updateLocalState = useUpdateLocalState();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, displayComponent } = data;
  return (
    <Icon
      onClick={() => {
        updateLocalState({
          displayComponent: ROUTE_REGISTRY.Meta,
          id,
          prevDisplayComponent: displayComponent,
          prevId: id,
          scrollY: window.scrollY,
        });
      }}
    />
  );
};
