import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Frame, ActionButton } from "./Nav.styles";

export const Nav = () => {
  const history = useHistory();
  return (
    <Frame>
      <Switch>
        <Route path="/folder">
          <ActionButton onClick={() => history.push("/folder")}>
            &#x2302;
          </ActionButton>
        </Route>
        <Route path="/image">
          <ActionButton onClick={() => history.push("/meta")}>
            &#x1f3f7;
          </ActionButton>
        </Route>
      </Switch>
    </Frame>
  );
};
