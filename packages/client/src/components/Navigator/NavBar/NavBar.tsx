import React from "react";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "./Home.svg";
import { ReactComponent as BackIcon } from "./Back.svg";

const Bar = styled.div`
  display: flex;
  background: lightblue;
`;

export default ({ base, client }: { base: string; client: any }) => (
  <Bar
    onClick={() => {
      const newPath = "/";

      client.writeData({
        data: {
          path: newPath,
        },
      });
    }}
  >
    <HomeIcon></HomeIcon>
    <BackIcon></BackIcon>
  </Bar>
);
