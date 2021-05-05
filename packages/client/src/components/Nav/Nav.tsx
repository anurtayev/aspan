import { useContext } from "react";
import { useHistory, Route } from "react-router-dom";

import { Routes, Characters, StateContext } from "common";
import { Frame, ActionButton, Id } from "./Nav.styles";

export const Nav = () => {
  const history = useHistory();
  const { folderPathname, imagePathname } = useContext(StateContext);

  const isHomeFolder =
    folderPathname === `/${Routes.folder}/` && !imagePathname;

  return (
    <Frame>
      <ActionButton
        onClick={() => {
          history.push(Routes.folder + "/");
        }}
      >
        {Characters.home}
      </ActionButton>
      <Route path={[Routes.folder, Routes.image]}>
        {/** Meta */}
        {!isHomeFolder && (
          <ActionButton onClick={() => history.push(`/${Routes.meta}`)}>
            {Characters.label}
          </ActionButton>
        )}

        {/** Search */}
        <ActionButton onClick={() => history.push(`/${Routes.search}`)}>
          {Characters.magnifyingGlass}
        </ActionButton>
      </Route>

      <Id>{imagePathname || folderPathname}</Id>
    </Frame>
  );
};
