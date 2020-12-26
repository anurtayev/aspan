import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Frame, ActionButton } from "./Nav.styles";
import { useEntryId, pathPrefix } from "common";

export const Nav = () => {
  const history = useHistory();
  const entryId = useEntryId();
  const isHomeFolder = entryId === "" || entryId === "/";

  const goHome = () => history.push(pathPrefix.folder);

  return (
    <Frame>
      <Switch>
        {/** Folder */}
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={goHome}>&#x1F3E0;</ActionButton>

          {/** Parent folder */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() =>
                history.push(
                  pathPrefix.folder + entryId.split("/").slice(0, -1).join("/")
                )
              }
            >
              &#x21e7;
            </ActionButton>
          )}

          {/** Meta */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() => history.push(pathPrefix.meta + entryId)}
            >
              &#x1f3f7;
            </ActionButton>
          )}
        </Route>

        {/** Image */}
        <Route path={pathPrefix.image}>
          {/** Home */}
          <ActionButton onClick={goHome}>&#x1F3E0;</ActionButton>

          {/** Meta */}
          <ActionButton onClick={() => history.push(pathPrefix.meta + entryId)}>
            &#x1f3f7;
          </ActionButton>
        </Route>

        {/** Meta */}
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={goHome}>&#x1F3E0;</ActionButton>
        </Route>

        {/** Catch all */}
        <Route>
          <ActionButton onClick={goHome}>&#x1F3E0;</ActionButton>
        </Route>
      </Switch>
    </Frame>
  );
};
