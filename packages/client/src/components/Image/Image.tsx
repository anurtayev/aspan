import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { ENTRY_DATA } from "./queries";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";

const FlexImage = styled.img`
  margin: 1em 1em 0 1em;
  object-fit: contain;
`;

export const Image = () => {
  const { loading: stateLoading, data: stateData } = useLocalState();

  const { id, prevDisplayComponent, prevId, prevScrollY } = stateData;

  const { loading, error, data } = useQuery(ENTRY_DATA, { variables: { id } });
  const updateLocalState = useUpdateLocalState();

  if (stateLoading) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <Error />;

  const { imageUrl } = data.getEntry;

  return (
    <FlexImage
      onClick={() => {
        updateLocalState({
          displayComponent: prevDisplayComponent,
          id: prevId,
          scrollY: prevScrollY,
          prevDisplayComponent: ROUTE_REGISTRY.image,
          prevId: id,
          prevScrollY: window.scrollY,
        });
      }}
      src={imageUrl}
      alt={id}
    />
  );
};
