import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import Card from "../Card";
import { GET_LOCAL_STATE, getFolderEntries } from "./queries";

const OuterFrame = styled.div`
  display: flex;
  margin: 0 1em 0 0;
`;

export default () => {
  const { data: localState } = useQuery(GET_LOCAL_STATE);

  console.log("==> 4 path", localState.path);

  const { loading, error, data, client } = useQuery(
    getFolderEntries(localState.path)
  );
  console.log("==> 1", data);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;
  return (
    <OuterFrame>
      {data.getFolderEntries.map((entry: any) => (
        <Card
          key={entry.id}
          {...entry}
          client={client}
          base={localState.path}
        ></Card>
      ))}
    </OuterFrame>
  );
};
