import { createContext, ReactNode, useRef, MutableRefObject } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Slides, SlidesVariables, Routes, getVariables } from ".";
import { FOLDER_ENTRIES } from "./queries";

export type StateContextType = {
  folderPathname: string;
  search: string;
  slides: Slides;
  savedScrollTopRef: MutableRefObject<number>;
  imagePathname: string;
};

const defaultState: StateContextType = {
  folderPathname: "",
  search: "",
  slides: { entries: [] },
  savedScrollTopRef: { current: 0 },
  imagePathname: "",
};
export const StateContext = createContext<StateContextType>(defaultState);

export const StateMachine = ({ children }: { children: ReactNode }) => {
  const { pathname, search } = useLocation();

  const { current: ctx } = useRef<StateContextType>(defaultState);
  const savedScrollTopRef = useRef<number>(0);

  if (pathname.startsWith(Routes.folder)) {
    if (ctx.folderPathname !== pathname) {
      ctx.folderPathname = pathname;
      ctx.search = search;
      ctx.savedScrollTopRef.current = 0;
    }

    ctx.imagePathname = "";
  } else if (
    pathname.startsWith(Routes.image) &&
    ctx.imagePathname !== pathname
  ) {
    ctx.imagePathname = pathname;
  }

  const { loading, error, data: slides } = useQuery<Slides, SlidesVariables>(
    FOLDER_ENTRIES,
    {
      variables: getVariables({
        pathname: ctx.folderPathname,
        search: ctx.search,
      }),
    }
  );

  if (loading || !slides) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  ctx.slides = slides;

  return (
    <StateContext.Provider value={{ ...ctx, savedScrollTopRef }}>
      {children}
    </StateContext.Provider>
  );
};
