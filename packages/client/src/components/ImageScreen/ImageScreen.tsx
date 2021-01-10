import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  pathPrefix,
  useEntryId,
  GetEntry,
  GetEntryVariables,
  GetEntry_entry_File,
  Characters,
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
  const entryId = useEntryId();

  const { loading, error, data } = useQuery<GetEntry, GetEntryVariables>(
    GET_ENTRY,
    {
      variables: { id: entryId },
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entry) return <p>Error. No such entry</p>;

  const { next, prev } = data.entry as GetEntry_entry_File;
  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + entryId}
        alt=""
        onClick={() => {
          const folder = entryId.split("/").slice(0, -1).join("/");
          history.push(pathPrefix.folder + folder || "/");
        }}
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
