import React from "react";
import styled from "styled-components";
import { useLocalState } from "aspanUtils";
// import Loading from "components/Loading";

const Bar = styled.div`
  display: flex;
  background: lightblue;
  margin: 1em 1em 0 1em;
  border-radius: 0.5em;
  padding: 0 1em 0 1em;
`;

const PathLabel = styled.p`
  font-weight: bold;
  margin-left: 2em;
`;

export default () => {
  const { loading, data } = useLocalState();

  if (loading)
    return (
      <Bar>
        <PathLabel>{"Loading..."}</PathLabel>
      </Bar>
    );

  const { id, commands } = data;

  return (
    <Bar>
      <PathLabel>
        {id}
        {commands}
      </PathLabel>
    </Bar>
  );
};
