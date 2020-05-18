import React from "react";
import { COMMAND_REGISTRY } from "aspanUtils";
import HomeCommand from "./HomeCommand";
import BackCommand from "./BackCommand";
import MetaCommand from "./MetaCommand";
import CancelMetaCommand from "./CancelMetaCommand";

export default (command: COMMAND_REGISTRY) => {
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
      return null;
  }
};
