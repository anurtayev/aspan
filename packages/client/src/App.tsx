import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { ImageScreen } from "components/ImageScreen";
import { Nav } from "components/Nav";

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/">
        <Redirect to="/folder" />
      </Route>
      <Route path="/folder">
        <FolderScreen />
      </Route>
      <Route path="/image">
        <ImageScreen />
      </Route>
    </Switch>
  </>
);

export default App;
