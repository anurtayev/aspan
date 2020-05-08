import React from "react";
import { COMMAND_REGISTRY } from "aspanUtils";
import HomeCommand from "./HomeCommand";
import BackCommand from "./BackCommand";
import MetaCommand from "./MetaCommand";

export default (command: COMMAND_REGISTRY) => {
  console.log("==>3");

  switch (command) {
    case COMMAND_REGISTRY.HomeCommand:
      console.log("==>4");
      return <HomeCommand key={command} />;
    case COMMAND_REGISTRY.BackCommand:
      console.log("==>5");
      return <BackCommand key={command} />;
    case COMMAND_REGISTRY.MetaCommand:
      console.log("==>6");
      return <MetaCommand key={command} />;
    default:
      return null;
  }
};
