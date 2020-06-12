import React from "react";
import { useLocalState, ROUTE_REGISTRY } from "aspanUtils";
import Folder from "components/Folder";
import Image from "components/Image";
import Meta from "components/Meta";
import Error from "components/Error";
import Loading from "components/Loading";

export default () => {
  const { loading, data } = useLocalState();
  if (loading) return <Loading />;
  const { id, displayComponent } = data;

  switch (displayComponent) {
    case ROUTE_REGISTRY.Meta:
      return <Meta id={id} />;
    case ROUTE_REGISTRY.Image:
      return <Image id={id} />;
    case ROUTE_REGISTRY.Folder:
      return <Folder />;
    default:
      return <Error message="bad displayComponent" />;
  }
};
