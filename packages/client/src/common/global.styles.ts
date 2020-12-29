import styled from "styled-components";

export const defaultTheme = {};

export const EntryFrame = `
  width: 150px;
  max-width: 150px;
  height: 150px;
  margin: .2rem;
  background: navy;
  border-radius: 1rem;
`;

export const SmallButton = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: red;
  width: 3rem;
  text-align: center;
`;

export const InputBox = styled.input`
  margin: 0 1rem 0 0;
  font-size: 1.5rem;
`;

export const FormLine = styled.div`
  height: 3rem;
  display: flex;
  margin: 0 0 1rem 0;
`;

export const Button = styled.button`
  height: 3rem;
  margin: 0 1rem 0 0;
  width: 10rem;
`;
