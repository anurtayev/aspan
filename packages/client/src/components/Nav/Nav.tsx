import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import {
  useEntryId,
  pathPrefix,
  Characters,
  AspanContext,
  getLastPointer,
  getFolderPathname,
} from "common";
import { Frame, ActionButton, Id } from "./Nav.styles";

export const Nav = () => {
  const history = useHistory();
  const entryId = useEntryId();
  const isHomeFolder = entryId === "" || entryId === "/";
  const ctx = useContext(AspanContext);

  if (!ctx) return <p>Error :(</p>;

  const goHome = () => history.push(pathPrefix.folder + "/");

  return (
    <Frame>
      <Switch>
        {/** ============================= FOLDER SCREEN */}
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>

          {/** Parent folder */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() =>
                history.push(getFolderPathname(getLastPointer(ctx)))
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

          {/** Search */}
          <ActionButton onClick={() => history.push(pathPrefix.search)}>
            {Characters.magnifyingGlass}
          </ActionButton>
        </Route>

        {/** ============================= IMAGE SCREEN */}
        <Route path={pathPrefix.image}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>

          {/** Meta */}
          <ActionButton onClick={() => history.push(pathPrefix.meta + entryId)}>
            {Characters.label}
          </ActionButton>

          {/** Search */}
          <ActionButton onClick={() => history.push(pathPrefix.search)}>
            {Characters.magnifyingGlass}
          </ActionButton>
        </Route>

        {/** ============================= META SCREEN */}
        <Route path={pathPrefix.meta}>
          {/** Home */}
          <ActionButton onClick={goHome}>{Characters.home}</ActionButton>

          {/** Search */}
          <ActionButton onClick={() => history.push(pathPrefix.search)}>
            {Characters.magnifyingGlass}
          </ActionButton>
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
