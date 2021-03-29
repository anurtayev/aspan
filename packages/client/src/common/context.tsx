import {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  RefObject,
  MutableRefObject,
} from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Location } from "history";

import { Repo, RepoVariables, MetaDataInput, pathPrefixesRegExp } from ".";
import { FOLDER_ENTRIES } from "./queries";
import { pathPrefix } from "./util";

const parseQueryString = (queryString: string): MetaDataInput => {
  const params = new URLSearchParams(queryString);
  return {
    tags: params.getAll("tags"),
    attributes: params.getAll("attributes").map((elem) => elem.split(",")),
  };
};

const getId = (pathname: string) => pathname.replace(pathPrefixesRegExp, "");

const getVariables = (location: Location<unknown>): RepoVariables => {
  const { pathname, search } = location;
  return {
    id: getId(pathname),
    metaDataInput: parseQueryString(search),
  };
};

export type AspanContextType = {
  repo: Repo;
  imagePath: RefObject<string>;
  scrollTop: RefObject<number>;
  repoVariables: MutableRefObject<RepoVariables>;
  folderScreen: RefObject<HTMLDivElement>;
};

export const AspanContext = createContext<AspanContextType | undefined>(
  undefined
);

export const AspanContextComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const location = useLocation();

  const repoVariables = useRef<RepoVariables>({});
  const scrollTop = useRef<number>(0);
  const imagePath = useRef<string>("");
  const folderScreen = useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery<Repo, RepoVariables>(
    FOLDER_ENTRIES,
    {
      variables: getVariables(location),
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (location.pathname.startsWith(pathPrefix.folder)) {
      repoVariables.current = getVariables(location);
      scrollTop.current = 0;
      imagePath.current = "";
    } else if (
      location.pathname.startsWith(pathPrefix.image) &&
      !imagePath.current
    ) {
      imagePath.current = getId(location.pathname);
    } else {
      if (!imagePath.current && folderScreen.current) {
        scrollTop.current = folderScreen.current.scrollTop;
      }
    }
  }, [location]);

  if (loading || !folderScreen) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <AspanContext.Provider
      value={{
        scrollTop,
        repo: data,
        imagePath,
        repoVariables,
        folderScreen,
      }}
    >
      {children}
    </AspanContext.Provider>
  );
};
