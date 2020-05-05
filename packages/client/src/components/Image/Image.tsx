import React from "react";
import { getEntry } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useNavigateToFolder } from "aspanUtils";

const FlexImage = styled.img`
  margin: 1em 1em 0 1em;
  object-fit: contain;
`;

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getEntry(id));
  const navigateToFolder = useNavigateToFolder();

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { imageUrl, parent } = data.getEntry;
  return (
    <FlexImage
      onClick={() => {
        navigateToFolder({ id: parent });
      }}
      src={imageUrl}
      alt={id}
    />
  );
};
