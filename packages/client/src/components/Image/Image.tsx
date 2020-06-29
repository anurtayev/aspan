import React from "react";
import { ENTRY_DATA } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";

const FlexImage = styled.img`
  margin: 1em 1em 0 1em;
  object-fit: contain;
`;

export default () => {
  console.log("==> 1");

  const { loading: stateLoading, data: stateData } = useLocalState();
  if (stateLoading) return <Loading />;

  const { id, prevDisplayComponent, prevId } = stateData;

  const { loading, error, data } = useQuery(ENTRY_DATA, { variables: { id } });
  const updateLocalState = useUpdateLocalState();

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { imageUrl } = data.getEntry;
  return (
    <FlexImage
      onClick={() => {
        updateLocalState({
          displayComponent: prevDisplayComponent,
          id: prevId,
          prevDisplayComponent: ROUTE_REGISTRY.Image,
          prevId: id,
          scrollY: window.scrollY,
        });
      }}
      src={imageUrl}
      alt={id}
    />
  );
};
