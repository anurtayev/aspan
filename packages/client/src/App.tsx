import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { Nav } from "components/Nav";

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/">
        <Redirect to="/folder" />
      </Route>
      <Route exact path="/folder">
        <FolderScreen />
      </Route>
      <Route path="/folder/:id">
        <FolderScreen />
      </Route>
    </Switch>
  </>
);

export default App;
