import React from "react";
import { getMetaData } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import styled from "styled-components";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { ROUTE_REGISTRY } from "aspanUtils";

const FlexImage = styled.div`
  border: 1px solid black;
  margin: 1em 1em 0 1em;
`;

export default ({ id }: { id: string }) => {
  const { loading, error } = useQuery(getMetaData(id));
  const client = useApolloClient();

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <FlexImage
      onClick={() => {
        client.writeData({
          data: {
            displayComponent: ROUTE_REGISTRY.Folder,
            id,
          },
        });
      }}
    />
  );
};
