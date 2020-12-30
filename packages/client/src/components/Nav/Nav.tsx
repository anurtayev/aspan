import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { useEntryId, pathPrefix, Characters } from "common";
import { Frame, ActionButton, Id } from "./Nav.styles";

export const Nav = () => {
  const history = useHistory();
  const entryId = useEntryId();
  const isHomeFolder = entryId === "" || entryId === "/";

  const goHome = () => history.push(pathPrefix.folder);

  return (
    <Frame>
      <Switch>
        {/** FOLDER SCREEN */}
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>

          {/** Parent folder */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() =>
                history.push(
                  pathPrefix.folder + entryId.split("/").slice(0, -1).join("/")
                )
              }
            >
              {Characters.arrowUp}
            </ActionButton>
          )}

          {/** Meta */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() => history.push(pathPrefix.meta + entryId)}
            >
              {Characters.label}
            </ActionButton>
          )}
        </Route>

        {/** IMAGE SCREEN */}
        <Route path={pathPrefix.image}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>

          {/** Meta */}
          <ActionButton onClick={() => history.push(pathPrefix.meta + entryId)}>
            {Characters.label}
          </ActionButton>
        </Route>

        {/** META SCREEN */}
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>
        </Route>

        {/** Catch all */}
        <Route>
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>
        </Route>
      </Switch>
      <Id>{entryId}</Id>
    </Frame>
  );
};
