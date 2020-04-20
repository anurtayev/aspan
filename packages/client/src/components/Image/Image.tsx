import React from "react";
import { APP_STATE } from "../../globalQueries";
import { useQuery } from "@apollo/react-hooks";
import { getEntry } from "./queries";
import Error from "../Error";
import Loading from "../Loading";

export default () => {
  const { data: localState } = useQuery(APP_STATE);
  const { loading, error, data } = useQuery(getEntry(localState.path));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return <img src={data.getEntry.imageUrl} alt={localState.path} />;
};
