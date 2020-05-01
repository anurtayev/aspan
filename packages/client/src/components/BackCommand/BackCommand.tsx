import React from "react";
import { ReactComponent as Icon } from "./Icon.svg";
import { useNavigateToFolder } from "globalUtil";

export default ({ parent }: { parent: string }) => {
  const navigateToFolder = useNavigateToFolder();

  return (
    <Icon
      onClick={() => {
        navigateToFolder({ id: parent });
      }}
    />
  );
};
