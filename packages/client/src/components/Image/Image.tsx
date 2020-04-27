import React from "react";
import { getEntry } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import styled from "styled-components";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { routes, useLocalState } from "globalUtil";

const FlexImage = styled.img`
  margin: 1em 1em 0 1em;
`;

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getEntry(id));
  const client = useApolloClient();

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <FlexImage
      onClick={() => {
        client.writeData({
          data: {
            displayComponent: routes.Folder,
            id: id.split("/").slice(0, -1).join("/"),
          },
        });
      }}
      src={data.getEntry.imageUrl}
      alt={id}
    />
  );
};
