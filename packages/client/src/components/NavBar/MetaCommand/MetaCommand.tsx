import React from "react";
import { ReactComponent as Icon } from "./Configuration.svg";
import { useNavigateToMeta, useLocalState } from "aspanUtils";

export default () => {
  const navigateToMeta = useNavigateToMeta();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;
  return (
    <Icon
      onClick={() => {
        navigateToMeta(id);
      }}
    />
  );
};
