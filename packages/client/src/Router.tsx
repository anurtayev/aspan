import React from "react";
import styled from "styled-components";

import { useLocalState, ROUTE_REGISTRY } from "aspanUtils";
import { Folder } from "components/Folder";
import { Image } from "components/Image";
import { Meta } from "components/Meta";
import { Error } from "components/Error";
import { Loading } from "components/Loading";

const Frame = styled.div`
  padding: 3em 0 0 0;
`;

const resolveComponent = (displayComponent: ROUTE_REGISTRY) => {
  switch (displayComponent) {
    case ROUTE_REGISTRY.meta:
      return <Meta />;
    case ROUTE_REGISTRY.image:
      return <Image />;
    case ROUTE_REGISTRY.folder:
      return <Folder />;
    default:
      return <Error message="bad displayComponent" />;
  }
};
export const Router = () => {
  const { loading, data } = useLocalState();
  if (loading) return <Loading />;

  const { displayComponent } = data;
  return <Frame>{resolveComponent(displayComponent)}</Frame>;
};
