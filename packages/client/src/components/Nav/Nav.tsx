import { useContext } from "react";
import { useHistory, Route, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Routes, Characters, StateContext, getId } from "common";

export const Nav = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const { refetch } = useContext(StateContext);

  const isHomeFolder = pathname === `${Routes.folder}/`;
  const isSearchFolder = pathname === Routes.folder && search;

  return (
    <Frame>
      {!isHomeFolder && (
        <ActionButton
          onClick={() => {
            history.push(Routes.folder + "/");
          }}
        >
          {Characters.home}
        </ActionButton>
      )}
      <Route path={[Routes.folder, Routes.image]}>
        {/** Meta */}
        {!isHomeFolder && !isSearchFolder && (
          <ActionButton
            onClick={() => history.push(Routes.meta + getId(pathname))}
          >
            {Characters.label}
          </ActionButton>
        )}

        {/** Search */}
        <ActionButton onClick={() => history.push(Routes.search)}>
          {Characters.magnifyingGlass}
        </ActionButton>

        {/** Refresh */}
        {isSearchFolder && (
          <ActionButton onClick={() => refetch()}>
            {Characters.refresh}
          </ActionButton>
        )}
      </Route>

      <Id>{pathname}</Id>
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
`;

const ActionButton = styled.div`
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background: green;
  margin: 1rem 0 1rem 1rem;
  cursor: default;
  flex-shrink: 0;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #47a7f5 radial-gradient(cirle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }

  &:active {
    background-color: lime;
    background-size: 100%;
    transition: background 0s;
  }
`;

const Id = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-left: auto;
  margin-right: 2rem;
`;
