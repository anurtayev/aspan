import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Frame, ActionButton } from "./Nav.styles";
import { pathPrefix } from "common";

export const Nav = () => {
  const history = useHistory();
  return (
    <Frame>
      <Switch>
        <Route path={pathPrefix.folder}>
          <ActionButton onClick={() => history.push(pathPrefix.folder)}>
            &#x2302;
          </ActionButton>
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
