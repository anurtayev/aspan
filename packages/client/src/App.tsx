import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { ImageScreen } from "components/ImageScreen";
import { Nav } from "components/Nav";
import { pathPrefix } from "common";

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/">
        <Redirect to={pathPrefix.folder} />
      </Route>
      <Route path={pathPrefix.folder}>
        <FolderScreen />
      </Route>
      <Route path={pathPrefix.image}>
        <ImageScreen />
      </Route>
    </Switch>
  </>
);

export default App;
