import React from "react";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "./Home.svg";
import { ReactComponent as BackIcon } from "./Back.svg";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { APP_STATE } from "../../globalQueries";

const Bar = styled.div`
  display: flex;
  background: lightblue;
  margin: 0 1em 0 1em;
  border-radius: 0.5em;
  padding: 0 1em 0 1em;
`;

const PathLabel = styled.p`
  font-weight: bold;
  margin-left: 2em;
`;

export default () => {
  const { data } = useQuery(APP_STATE);
  const client = useApolloClient();

  return (
    <Bar>
      <HomeIcon
        onClick={() => {
          const newPath = "/";

          client.writeData({
            data: {
              path: newPath,
            },
          });
        }}
      ></HomeIcon>
      <BackIcon></BackIcon>
      <PathLabel>{data.path}</PathLabel>
    </Bar>
  );
};
