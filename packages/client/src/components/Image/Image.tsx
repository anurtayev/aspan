import React from "react";
import { ENTRY_DATA } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useNavigateToFolder, parent } from "aspanUtils";

const FlexImage = styled.img`
  margin: 1em 1em 0 1em;
  object-fit: contain;
`;

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(ENTRY_DATA, { variables: { id } });
  const navigateToFolder = useNavigateToFolder();

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { imageUrl } = data.getEntry;
  return (
    <FlexImage
      onClick={() => {
        navigateToFolder({ id: parent(id) });
      }}
      src={imageUrl}
      alt={id}
    />
  );
};
