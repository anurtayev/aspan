import { createContext, ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Slides, SlidesVariables, Routes, getVariables } from ".";
import { FOLDER_ENTRIES } from "./queries";

export type StateContextType = {
  folderPathname: string;
  search: string;
  slides: Slides;
  savedScrollTops: Map<string, number>;
  imagePathname: string;
  refetch: () => any;
};

const defaultState: StateContextType = {
  folderPathname: "",
  search: "",
  slides: { entries: [] },
  savedScrollTops: new Map<string, number>(),
  imagePathname: "",
  refetch: () => {},
};
export const StateContext = createContext<StateContextType>(defaultState);

export const StateMachine = ({ children }: { children: ReactNode }) => {
  const { pathname, search } = useLocation();

  const { current: ctx } = useRef<StateContextType>(defaultState);

  if (pathname.startsWith(Routes.folder)) {
    if (ctx.folderPathname !== pathname || ctx.search !== search) {
      ctx.folderPathname = pathname;
      ctx.search = search;
    }

    ctx.imagePathname = "";
  } else if (
    pathname.startsWith(Routes.image) &&
    ctx.imagePathname !== pathname
  ) {
    ctx.imagePathname = pathname;
  }

  const variables = getVariables({
    pathname: ctx.folderPathname,
    search: ctx.search,
  });

  const {
    loading,
    error,
    data: slides,
    refetch,
  } = useQuery<Slides, SlidesVariables>(FOLDER_ENTRIES, {
    variables,
    fetchPolicy: "no-cache",
  });

  if (loading || !slides) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  ctx.slides = slides;
  ctx.refetch = refetch;

  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
};
