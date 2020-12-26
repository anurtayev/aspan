import styled from "styled-components";
import { ContainerStyles } from "common";

export const Frame = styled(styled.div([ContainerStyles]))`
  background: ${(props) => props.theme.primaryColor};
  display: flex;
  justify-content: center;
`;
