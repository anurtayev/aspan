import React from "react";
import { Switch, Route } from "react-router-dom";

import { FolderScreen } from "components/FolderScreen";
import { ImageScreen } from "components/ImageScreen";
import { MetaScreen } from "components/MetaScreen";
import { SearchScreen } from "components/SearchScreen";
import { Nav } from "components/Nav";
import { Routes } from "common";

export const App = () => (
  <>
    <Nav />
    <Switch>
      <Route path={Routes.folder}>
        <FolderScreen />
      </Route>
      <Route path={Routes.image + "/:id+"}>
        <ImageScreen />
      </Route>
      <Route path={Routes.meta}>
        <MetaScreen />
      </Route>
      <Route path={Routes.search}>
        <SearchScreen />
      </Route>
    </Switch>
  </>
);
