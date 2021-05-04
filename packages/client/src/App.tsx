import React from "react";
import { Switch, Route } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { ImageScreen } from "components/ImageScreen";
import { MetaScreen } from "components/MetaScreen";
import { SearchScreen } from "components/SearchScreen";
import { Nav } from "components/Nav";
import { State } from "common";

export const App = () => (
  <>
    <Nav />
    <Switch>
      <Route path={State.folder}>
        <FolderScreen />
      </Route>
      <Route path={State.image}>
        <ImageScreen />
      </Route>
      <Route path={State.meta}>
        <MetaScreen />
      </Route>
      <Route path={State.search}>
        <SearchScreen />
      </Route>
    </Switch>
  </>
);
