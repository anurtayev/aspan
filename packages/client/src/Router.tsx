import React from "react";

import { useLocalState, ROUTE_REGISTRY } from "aspanUtils";
import { Folder } from "components/Folder";
import { Image } from "components/Image";
import { Meta } from "components/Meta";
import { Loading } from "components/Loading";

const components = {
  [ROUTE_REGISTRY.meta]: <Meta />,
  [ROUTE_REGISTRY.image]: <Image />,
  [ROUTE_REGISTRY.folder]: <Folder />,
};

export const Router = () => {
  const { loading, data } = useLocalState();
  if (loading) return <Loading />;

  const { displayComponent } = data;
  return components[displayComponent as ROUTE_REGISTRY];
};
