import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Routes, Characters, StateContext } from "common";
import {
  Frame,
  Image,
  LeftSlideButton,
  RightSlideButton,
} from "./ImageScreen.styles";

export const ImageScreen = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { slides, folderPathname, search, navRef } = useContext(StateContext);

  const entry = slides.entries.find((entry) => entry.id === "/" + id);

  if (!entry || entry.__typename !== "File") throw new Error("entry not found");

  return (
    <Frame>
      <Image
        src={`${process.env.REACT_APP_THUMBOR_URL}/unsafe/fit-in/${
          navRef.current?.clientWidth
        }x${
          document.documentElement.clientHeight -
          (navRef.current?.clientHeight || 0)
        }/${encodeURIComponent(
          `${process.env.REACT_APP_IMG_CDN_URL_INTERNAL || ""}/${id}`
        )}`}
        alt=""
        onClick={() => history.push(folderPathname + search)}
      />
      {entry.prev && (
        <LeftSlideButton
          onClick={() => {
            history.push(Routes.image + entry.prev);
          }}
        >
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {entry.next && (
        <RightSlideButton
          onClick={() => history.push(Routes.image + entry.next)}
        >
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};
