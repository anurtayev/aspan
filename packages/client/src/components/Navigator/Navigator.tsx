import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Card from "../Card";

const GET_ROOT_FOLDER_ENTRIES_QUERY = gql`
  {
    getRootFolderEntries {
      ... on Entry {
        __typename
        id
      }
    }
  }
`;

const OuterFrame = styled.div`
  display: flex;
  margin: 0 1em 0 0;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_ROOT_FOLDER_ENTRIES_QUERY);
  console.log("==> 1", data);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;
  return (
    <OuterFrame>
      {data.getRootFolderEntries.map((entry: any) => (
        <Card key={entry.id} {...entry}></Card>
      ))}
    </OuterFrame>
  );
};
