import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { ImageScreen } from "components/ImageScreen";
import { MetaScreen } from "components/MetaScreen";
import { SearchScreen } from "components/SearchScreen";
import { Nav } from "components/Nav";
import { pathPrefix } from "common";

export const App = () => (
  <>
    <Nav />
    <Switch>
      <Route path={pathPrefix.folder}>
        <FolderScreen />
      </Route>
      <Route path={pathPrefix.image}>
        <ImageScreen />
      </Route>
      <Route path={pathPrefix.meta}>
        <MetaScreen />
      </Route>
      <Route path={pathPrefix.search}>
        <SearchScreen />
      </Route>
      <Route>
        <Redirect to={pathPrefix.folder + "/"} />
      </Route>
    </Switch>
  </>
);
