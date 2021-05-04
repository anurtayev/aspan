import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

import { useEntryId, State, Characters } from "common";
import { Frame, ActionButton, Id } from "./Nav.styles";

export const Nav = () => {
  const history = useHistory();
  const entryId = useEntryId();
  const isHomeFolder = entryId === "/";

  return (
    <Frame>
      <ActionButton
        onClick={() => {
          history.push(State.folder + "/");
        }}
      >
        {Characters.home}
      </ActionButton>
      <Route path={[State.folder, State.image]}>
        {/** Meta */}
        {!isHomeFolder && (
          <ActionButton onClick={() => history.push(State.meta + entryId)}>
            {Characters.label}
          </ActionButton>
        )}

        {/** Search */}
        <ActionButton onClick={() => history.push(State.search)}>
          {Characters.magnifyingGlass}
        </ActionButton>
      </Route>

      <Id>{entryId}</Id>
    </Frame>
  );
};
