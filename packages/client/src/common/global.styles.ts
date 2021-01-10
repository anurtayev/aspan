import styled from "styled-components";

export const defaultTheme = {};

export const EntryFrame = `
  width: 150px;
  max-width: 150px;
  height: 150px;
  margin: .2rem;
  background: darkslategrey;
  border-radius: .4rem;
`;

export const SmallButton = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: lightgrey;
  border: 1px solid;
  width: 2rem;
  border-radius: 0 50% 50% 0;
  text-align: center;
  cursor: default;

  &:hover {
    background: darkgrey;
  }
`;

export const FormLine = styled.div`
  height: 2rem;
  font-size: 1.2rem;
  display: flex;
  margin: 0 1rem 1rem 0;
`;

export const Button = styled.button`
  height: 3rem;
  margin: 0 1rem 0 0;
  width: 10rem;
`;

export const ErrorMessage = styled.h6`
  color: red;
`;
