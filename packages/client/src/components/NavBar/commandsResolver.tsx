import React from "react";
import { COMMAND_REGISTRY } from "aspanUtils";
import HomeCommand from "components/HomeCommand";
import BackCommand from "components/BackCommand";

export default (command: COMMAND_REGISTRY) => {
  switch (command) {
    case COMMAND_REGISTRY.HomeCommand:
      return <HomeCommand key={command} />;
    case COMMAND_REGISTRY.BackCommand:
      return <BackCommand key={command} />;
    default:
      return null;
  }
};
