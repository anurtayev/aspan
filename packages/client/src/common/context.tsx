import { createContext, ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Slides, SlidesVariables, MetaDataInput, pathPrefixesRegExp } from ".";
import { FOLDER_ENTRIES } from "./queries";

export enum Routes {
  folder = "/folder",
  image = "/image",
  meta = "/meta",
  search = "/search",
}

const parseQueryString = (queryString: string): MetaDataInput | undefined => {
  const params = new URLSearchParams(queryString);
  const tags = params.getAll("tags");
  const attributes = params.getAll("attributes").map((elem) => elem.split(","));

  return tags.length || attributes.length
    ? {
        tags: params.getAll("tags"),
        attributes: params.getAll("attributes").map((elem) => elem.split(",")),
      }
    : undefined;
};

const getId = (pathname: string): string | undefined => {
  const path = pathname.replace(pathPrefixesRegExp, "");
  return path || undefined;
};

const getVariables = ({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}): SlidesVariables => {
  return {
    id: getId(pathname),
    metaDataInput: parseQueryString(search),
  };
};

export type StateContextType = {
  folderPathname: string;
  search: string;
  slides: Slides;
  savedScrollTopRef: number;
  imagePathname: string;
};

const defaultState: StateContextType = {
  folderPathname: "",
  search: "",
  slides: { entries: [] },
  savedScrollTopRef: 0,
  imagePathname: "",
};
export const StateContext = createContext<StateContextType>(defaultState);

export const StateMachine = ({ children }: { children: ReactNode }) => {
  const { pathname, search } = useLocation();

  const { current: ctx } = useRef<StateContextType>(defaultState);

  if (pathname.startsWith(Routes.folder)) {
    if (ctx.folderPathname !== pathname) {
      ctx.folderPathname = pathname;
      ctx.search = search;
      ctx.savedScrollTopRef = 0;
    }

    ctx.imagePathname = "";
  } else if (
    pathname.startsWith(Routes.image) &&
    ctx.imagePathname !== pathname
  ) {
    ctx.imagePathname = pathname;
  }

  console.log(
    "==> StateMachine ps",
    JSON.stringify(
      getVariables({
        pathname: ctx.folderPathname,
        search: ctx.search,
      }),
      null,
      2
    )
  );

  const { loading, error, data: slides } = useQuery<Slides, SlidesVariables>(
    FOLDER_ENTRIES,
    {
      variables: getVariables({
        pathname: ctx.folderPathname,
        search: ctx.search,
      }),
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  ctx.slides = slides as Slides;

  console.log("==> StateMachine", slides?.entries.length);
  return (
    <StateContext.Provider value={{ ...ctx }}>{children}</StateContext.Provider>
  );
};
