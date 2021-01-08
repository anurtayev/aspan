import styled from "styled-components";
import { Form } from "formik";
import { Button } from "common";

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Section = styled.div`
  margin: 1rem 0 0 2rem;
`;

export const PictureSymbol = styled.span`
  font-size: 3rem;
`;

export const EntryName = styled.span`
  font-size: 2rem;
  margin: 0 0 0 1rem;
`;

export const SubmitButton = styled(Button)`
  background: deepskyblue;
`;

export const SectionHeader = styled.h5`
  color: red;
`;

export const ElemBox = styled.div`
  border: 1px solid;
  padding: 0 0.5rem 0 0.5rem;
  background: lightgrey;
`;

export const ExistingItemsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
