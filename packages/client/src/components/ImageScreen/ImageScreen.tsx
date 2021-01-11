import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  pathPrefix,
  useEntryId,
  GetEntry,
  GetEntryVariables,
  GetEntry_entry_File,
  Characters,
  AspanContext,
  getFolderPathname,
  getLastPointer,
} from "common";
import {
  Frame,
  Image,
  LeftSlideButton,
  RightSlideButton,
} from "./ImageScreen.styles";
import { GET_ENTRY } from "./queries";

export const ImageScreen = () => {
  const history = useHistory();
  const id = useEntryId();
  const ctx = useContext(AspanContext);

  const { loading, error, data } = useQuery<GetEntry, GetEntryVariables>(
    GET_ENTRY,
    {
      variables: { id },
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entry || !ctx)
    return <p>Error. No such entry or AspanContext is missing</p>;

  const { next, prev } = data.entry as GetEntry_entry_File;
  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + id}
        alt=""
        onClick={() => history.push(getFolderPathname(getLastPointer(ctx)))}
      />
      {prev && (
        <LeftSlideButton onClick={() => history.push(pathPrefix.image + prev)}>
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {next && (
        <RightSlideButton onClick={() => history.push(pathPrefix.image + next)}>
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};
