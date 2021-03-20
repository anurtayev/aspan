import { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  pathPrefix,
  useEntryId,
  Characters,
  getFolderPathname,
  AspanContext,
} from "common";
import {
  Frame,
  Image,
  LeftSlideButton,
  RightSlideButton,
} from "./ImageScreen.styles";

export const ImageScreen = () => {
  const history = useHistory();
  const entryId = useEntryId();
  const ctx = useContext(AspanContext);

  if (!ctx?.repoVariables) throw new Error("context error");

  const {
    repoVariables,
    repo: { entries },
  } = ctx;

  const entry = entries.find((entry) => entry.id === entryId);

  if (!entry || entry.__typename !== "File") throw new Error("entry not found");

  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + entryId}
        alt=""
        onClick={() => history.push(getFolderPathname(repoVariables))}
      />
      {entry.prev && (
        <LeftSlideButton
          onClick={() => {
            history.push(pathPrefix.image + entry.prev);
          }}
        >
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {entry.next && (
        <RightSlideButton
          onClick={() => history.push(pathPrefix.image + entry.next)}
        >
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};
