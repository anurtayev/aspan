import React from "react";
import { useLocalState, COMMAND_REGISTRY } from "aspanUtils";
import HomeCommand from "components/HomeCommand";
import Error from "components/Error";
import Loading from "components/Loading";

export default () => {
  const { loading, data } = useLocalState();
  if (loading) return <Loading />;
  const { commands } = data;
  return commands.map((command: COMMAND_REGISTRY) => {
    switch (command) {
      case COMMAND_REGISTRY.HomeCommand:
        return <HomeCommand />;
      case COMMAND_REGISTRY.BackCommand:
        return <HomeCommand />;
      default:
        return <Error message="bad displayComponent" />;
    }
  });
};
