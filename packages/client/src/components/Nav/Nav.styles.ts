import styled from "styled-components";

export const Frame = styled.div`
  display: flex;
`;

export const ActionButton = styled.div`
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background: green;
  margin: 1rem 0 1rem 1rem;
  cursor: default;
  flex-shrink: 0;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #47a7f5 radial-gradient(cirle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }

  &:active {
    background-color: lime;
    background-size: 100%;
    transition: background 0s;
  }
`;

export const Id = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  margin-left: auto;
  margin-right: 2rem;
`;
