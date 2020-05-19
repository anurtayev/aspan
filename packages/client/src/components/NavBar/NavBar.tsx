import React from "react";
import styled from "styled-components";
import { useLocalState, COMMAND_REGISTRY } from "aspanUtils";
import commandsResolver from "./commandsResolver";

const Bar = styled.div`
  display: flex;
  height: 3em;
  background: lightblue;
  margin: 1em 1em 0 1em;
  border-radius: 0.5em;
  padding: 0 1em 0 1em;
  align-items: center;
`;

const PathLabel = styled.span`
  font-weight: bold;
  margin-left: 2em;
`;

export default () => {
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, commands } = data;

  return (
    <Bar>
      <>
        {commands.map((command: COMMAND_REGISTRY) => commandsResolver(command))}
        <PathLabel>{id}</PathLabel>
      </>
    </Bar>
  );
};
