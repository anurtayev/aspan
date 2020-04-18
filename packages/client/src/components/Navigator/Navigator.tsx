import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import Card from "./Card";
import NavBar from "./NavBar";
import { GET_LOCAL_STATE, getFolderEntries } from "./queries";

const Container = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em 0 0;
`;

export default () => {
  const { data: localState } = useQuery(GET_LOCAL_STATE);

  const { loading, error, data, client } = useQuery(
    getFolderEntries(localState.path)
  );

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;

  return (
    <Container>
      <NavBar client={client} base={localState.path}></NavBar>
      <Cards>
        {data.getFolderEntries.map((entry: any) => (
          <Card
            key={entry.id}
            {...entry}
            client={client}
            base={localState.path}
          ></Card>
        ))}
      </Cards>
    </Container>
  );
};
