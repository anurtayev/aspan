import React from "react";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "./Home.svg";
import { ReactComponent as BackIcon } from "./Back.svg";
import { ReactComponent as ConfigurationIcon } from "./Configuration.svg";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { routes, useLocalState } from "globalUtil";

const Bar = styled.div`
  display: flex;
  background: lightblue;
  margin: 1em 1em 0 1em;
  border-radius: 0.5em;
  padding: 0 1em 0 1em;
`;

const PathLabel = styled.p`
  font-weight: bold;
  margin-left: 2em;
`;

export default () => {
  const { data: localState } = useLocalState();
  const client = useApolloClient();

  return (
    <Bar>
      <HomeIcon
        onClick={() => {
          const newPath = "/";

          client.writeData({
            data: {
              displayComponent: routes.Folder,

              id: newPath,
            },
          });
        }}
      ></HomeIcon>
      <BackIcon></BackIcon>
      <ConfigurationIcon
        onClick={() => {
          const newPath = "meta:" + localState.id;

          client.writeData({
            data: {
              displayComponent: routes.Meta,
              id: newPath,
            },
          });
        }}
      />
      <PathLabel>{localState.id}</PathLabel>
    </Bar>
  );
};
