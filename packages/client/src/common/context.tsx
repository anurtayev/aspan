import { createContext, ReactNode, useRef, createRef, RefObject } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import * as H from "history";

import { Slides, SlidesVariables, Routes, getVariables } from ".";
import { FOLDER_ENTRIES } from "./queries";

type SavedScrollTops = Map<string, number>;
type SaveScrollTopFn = (params: H.Location<unknown>) => SavedScrollTops;
type RestoreScrollTopFn = (params: H.Location<unknown>) => null | void;

export type StateContextType = {
  folderPathname: string;
  search: string;
  slides: Slides;
  imagePathname: string;
  refetch: () => any;
  imagesDivRef: RefObject<HTMLDivElement>;
  saveScrollTopFn: SaveScrollTopFn;
  restoreScrollTopFn: RestoreScrollTopFn;
};

const imagesDivRef = createRef<HTMLDivElement>();
const savedScrollTops = new Map<string, number>();
const saveScrollTopFn: SaveScrollTopFn = ({ pathname, search }) =>
  savedScrollTops.set(
    pathname + search,
    imagesDivRef.current?.scrollTop as number
  );
const restoreScrollTopFn: RestoreScrollTopFn = ({ pathname, search }) =>
  imagesDivRef.current &&
  imagesDivRef.current.scrollTo(0, savedScrollTops.get(pathname + search) || 0);

const defaultState: StateContextType = {
  folderPathname: "",
  search: "",
  slides: { entries: [] },
  imagePathname: "",
  refetch: () => {},
  imagesDivRef,
  saveScrollTopFn,
  restoreScrollTopFn,
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
