import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  MutableRefObject,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Location } from "history";

import { Slides, SlidesVariables, MetaDataInput, pathPrefixesRegExp } from ".";
import { FOLDER_ENTRIES } from "./queries";

export enum State {
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

const getVariables = (location: Location<unknown>): SlidesVariables => {
  const { pathname, search } = location;
  return {
    id: getId(pathname),
    metaDataInput: parseQueryString(search),
  };
};

const getState = (pathname: string): State => {
  switch (`/${pathname.split("/")[1]}`) {
    case State.folder:
      return State.folder;
    case State.image:
      return State.image;
    case State.meta:
      return State.meta;
    case State.search:
      return State.search;
  }
  throw new Error("unknown state");
};

export type AspanContextType = {
  folderId: MutableRefObject<string>;
  slidesVariables: MutableRefObject<SlidesVariables>;
  slides: MutableRefObject<Slides>;
  savedScrollTopRef: MutableRefObject<number>;

  imageId?: MutableRefObject<string>;

  currentState: State;
};

export const AspanContext = createContext<AspanContextType | undefined>(
  undefined
);

export const StateMachine = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const folderId = useRef<string>("");
  const slidesVariables = useRef<SlidesVariables>({});
  const slides = useRef<Slides>({ entries: [] });
  const savedScrollTopRef = useRef<number>(0);
  const imageId = useRef<string>("");
  const [currentState, setCurrentState] = useState<State>(State.folder);

  const { loading, error, data } = useQuery<Slides, SlidesVariables>(
    FOLDER_ENTRIES,
    {
      variables: slidesVariables.current,
    }
  );

  useEffect(() => {
    const { pathname, search } = location;
    const incomingId = `${pathname}${search}`;

    if (pathname.startsWith(State.folder)) {
      if (folderId.current !== incomingId) {
        folderId.current = incomingId;
        slidesVariables.current = getVariables(location);
        savedScrollTopRef.current = 0;
      }

      imageId.current = "";
    } else if (
      pathname.startsWith(State.image) &&
      imageId.current !== incomingId
    ) {
      imageId.current = incomingId;
    }

    setCurrentState(getState(pathname));
  }, [location]);

  if (loading) return <p>Loading...</p>;
  if (error || typeof data === "undefined") return <p>Error</p>;

  slides.current = data;

  return (
    <AspanContext.Provider
      value={{
        folderId,
        slidesVariables,
        slides,
        savedScrollTopRef,
        imageId,
        currentState,
      }}
    >
      {children}
    </AspanContext.Provider>
  );
};

export const useAspanContext = () => {
  const ctx = useContext(AspanContext);

  if (
    !ctx ||
    !ctx.currentState ||
    !ctx.folderId ||
    !ctx.slidesVariables ||
    !ctx.slides
  )
    throw new Error("context error");

  return ctx;
};
