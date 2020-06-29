import React from "react";
import { useLocalState, ROUTE_REGISTRY } from "aspanUtils";
import Folder from "components/Folder";
import Image from "components/Image";
import Meta from "components/Meta";
import Error from "components/Error";
import Loading from "components/Loading";

export default () => {
  console.log("==> 2");

  const { loading, data } = useLocalState();
  if (loading) return <Loading />;
  const { displayComponent } = data;

  console.log("==> 4", displayComponent);

  switch (displayComponent) {
    case ROUTE_REGISTRY.Meta:
      return <Meta />;
    case ROUTE_REGISTRY.Image:
      return <Image />;
    case ROUTE_REGISTRY.Folder:
      return <Folder />;
    default:
      return <Error message="bad displayComponent" />;
  }
};
