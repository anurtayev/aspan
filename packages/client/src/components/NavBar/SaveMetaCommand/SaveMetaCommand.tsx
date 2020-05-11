import React from "react";
import { ReactComponent as Icon } from "./Save.svg";
import { useNavigateToImage, useLocalState } from "aspanUtils";
import useSaveMeta from "./useSaveMeta";

export default () => {
  const navigateToImage = useNavigateToImage();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;
  return (
    <Icon
      onClick={() => {
        useSaveMeta();
        navigateToImage({ id });
      }}
    />
  );
};
