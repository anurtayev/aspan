import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { getMetaData } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";

const FlexImage = styled.div`
  border: 1px solid black;
  margin: 1em 1em 0 1em;
`;

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getMetaData(id));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return <FlexImage>META</FlexImage>;
};
