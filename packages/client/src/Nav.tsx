import React from "react";
import styled from "styled-components";
import { useLocalState, COMMAND_REGISTRY, ROUTE_REGISTRY } from "aspanUtils";
import HomeCommand from "commands/HomeCommand";
import BackCommand from "commands/BackCommand";
import MetaCommand from "commands/MetaCommand";
import CancelMetaCommand from "commands/CancelMetaCommand";

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

const FOLDER_COMMANDS = [
  COMMAND_REGISTRY.HomeCommand,
  COMMAND_REGISTRY.BackCommand,
];
const IMAGE_COMMANDS = [COMMAND_REGISTRY.MetaCommand];
const META_COMMANDS = [COMMAND_REGISTRY.CancelMetaCommand];

const commandsResolver = (command: COMMAND_REGISTRY) => {
  switch (command) {
    case COMMAND_REGISTRY.HomeCommand:
      return <HomeCommand key={command} />;
    case COMMAND_REGISTRY.BackCommand:
      return <BackCommand key={command} />;
    case COMMAND_REGISTRY.MetaCommand:
      return <MetaCommand key={command} />;
    case COMMAND_REGISTRY.CancelMetaCommand:
      return <CancelMetaCommand key={command} />;
    default:
      throw new Error("invalid command");
  }
};

const resolveCommands = (displayComponent: ROUTE_REGISTRY) => {
  switch (displayComponent) {
    case ROUTE_REGISTRY.Meta:
      return META_COMMANDS;
    case ROUTE_REGISTRY.Image:
      return IMAGE_COMMANDS;
    case ROUTE_REGISTRY.Folder:
      return FOLDER_COMMANDS;
    default:
      throw new Error("invalid displayComponent");
  }
};

export default () => {
  const { loading, data } = useLocalState();

  if (loading) return null;

  const { id, displayComponent } = data;

  return (
    <Bar>
      <>
        {resolveCommands(displayComponent).map((command: COMMAND_REGISTRY) =>
          commandsResolver(command)
        )}
        <PathLabel>{id}</PathLabel>
      </>
    </Bar>
  );
};
