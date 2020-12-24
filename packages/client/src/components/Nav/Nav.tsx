import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Frame, ActionButton } from "./Nav.styles";
import { pathPrefix } from "common";

export const Nav = () => {
  const history = useHistory();
  const location = useLocation();
  const folderPath = location.pathname.replace(pathPrefix.folder, "");
  const isHomeFolder = folderPath === "" || folderPath === "/";

  return (
    <Frame>
      <Switch>
        <Route path={pathPrefix.folder}>
          {/** Home */}
          <ActionButton onClick={() => history.push(pathPrefix.folder)}>
            &#x1F3E0;
          </ActionButton>

          {/** Parent folder */}
          {!isHomeFolder && (
            <ActionButton
              onClick={() =>
                history.push(
                  pathPrefix.folder +
                    folderPath.split("/").slice(0, -1).join("/")
                )
              }
            >
              &#x21e7;
            </ActionButton>
          )}
        </Route>
        <Route path={pathPrefix.image}>
          <ActionButton onClick={() => history.push(pathPrefix.meta)}>
            &#x1f3f7;
          </ActionButton>
        </Route>
      </Switch>
    </Frame>
  );
};
