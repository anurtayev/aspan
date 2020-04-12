import React from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ENTRIES = gql`
  {
    getFolderEntries(id: "/bf1") {
      ... on Entry {
        id
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_ENTRIES, {
    variables: { language: "english" },
  });
  console.log("==> 1", data);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;
  return (
    <>
      {data.getFolderEntries.map((entry: any) => (
        <div key={entry.id}>{entry.id}</div>
      ))}
    </>
  );
};

export default App;
