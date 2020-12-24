import styled from "styled-components";

import { EntryFrame } from "common";

export const Frame = styled(styled.div`
  ${EntryFrame}
`)`
  border: 1px solid black;
  width: 148px;
  max-width: 148px;
  height: 148px;
`;

export const IconFrame = styled.div`
  font-size: 5rem;
`;
