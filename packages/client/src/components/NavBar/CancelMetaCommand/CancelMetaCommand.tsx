import React from "react";
import { ReactComponent as Icon } from "./Cancel.svg";
import { useNavigateToImage, useLocalState } from "aspanUtils";

export default () => {
  const navigateToImage = useNavigateToImage();
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id } = data;
  return (
    <Icon
      onClick={() => {
        navigateToImage({ id });
      }}
    />
  );
};
