import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useQuery } from "@apollo/react-hooks";
import Error from "../Error";
import Loading from "../Loading";
import { getFolderEntries } from "./queries";
import { APP_STATE } from "../../globalQueries";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em 0 0;
`;

export default () => {
  const { data: localState } = useQuery(APP_STATE);
  const { loading, error, data } = useQuery(getFolderEntries(localState.path));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      {data.getFolderEntries.map((entry: any) => (
        <Card key={entry.id} {...entry}></Card>
      ))}
    </Container>
  );
};
