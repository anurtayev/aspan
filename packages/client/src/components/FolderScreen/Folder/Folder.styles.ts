import styled from "styled-components";

import { EntryFrame } from "common";

export const Frame = styled(styled.div`
  ${EntryFrame}
`)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const IconFrame = styled.div`
  font-size: 3.5rem;
  text-align: center;
`;

export const PaddedSpan = styled.div`
  padding: 0 1rem 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  font-size: 0.5;
  text-align: center;
`;
