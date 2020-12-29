import styled from "styled-components";
import { Form } from "formik";

export const Frame = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Section = styled.div`
  margin: 2rem;
`;

export const PictureSymbol = styled.span`
  font-size: 3rem;
`;

export const EntryName = styled.span`
  font-size: 2rem;
  margin: 0 0 0 1rem;
`;
