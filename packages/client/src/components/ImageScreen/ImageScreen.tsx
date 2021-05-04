import { useHistory } from "react-router-dom";

import {
  State,
  useEntryId,
  Characters,
  useAspanContext,
  getGoBackPath,
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
  const ctx = useAspanContext();

  const entry = ctx.slides.current.entries.find(
    (entry) => entry.id === entryId
  );

  if (!entry || entry.__typename !== "File") throw new Error("entry not found");

  return (
    <Frame>
      <Image
        src={process.env.REACT_APP_IMG_CDN_URL + entryId}
        alt=""
        onClick={() => history.push(getGoBackPath(ctx))}
      />
      {entry.prev && (
        <LeftSlideButton
          onClick={() => {
            history.push(State.image + entry.prev);
          }}
        >
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {entry.next && (
        <RightSlideButton
          onClick={() => history.push(State.image + entry.next)}
        >
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};
