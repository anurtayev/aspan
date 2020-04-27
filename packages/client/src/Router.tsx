import React from "react";
import { useLocalState } from "globalUtil";
import Folder from "components/Folder";
import Image from "components/Image";
import Meta from "components/Meta";
import Error from "components/Error";
import { routes } from "globalUtil";

export default () => {
  const { id, displayComponent } = useLocalState();

  switch (displayComponent) {
    case routes.Meta:
      return <Meta id={id} />;
    case routes.Image:
      return <Image id={id} />;
    case routes.Folder:
      return <Folder id={id} />;
    default:
      return <Error message="bad displayComponent" />;
  }
};
