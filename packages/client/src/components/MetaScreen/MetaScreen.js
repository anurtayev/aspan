import React from "react";

import { useEntryId } from "common";
import { Frame } from "./MetaScreen.styles";

export const MetaScreen = () => {
  const entryId = useEntryId();

  return <Frame>Meta: {entryId}</Frame>;
};
