import {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Location } from "history";

import { Repo, RepoVariables, MetaDataInput, pathPrefixesRegExp } from ".";
import { FOLDER_ENTRIES } from "./queries";
import { pathPrefix } from "./util";

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
  repoVariables: RepoVariables;
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

  const [repoVariables, setRepoVariables] = useState<RepoVariables>({});
  const scrollTop = useRef<number>(0);
  const imagePath = useRef<string>("");
  const folderScreen = useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery<Repo, RepoVariables>(
    FOLDER_ENTRIES,
    {
      variables: repoVariables,
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (location.pathname.startsWith(pathPrefix.folder)) {
      console.log("==> 2");
      setRepoVariables(getVariables(location));
      scrollTop.current = 0;
      imagePath.current = "";
    } else if (
      location.pathname.startsWith(pathPrefix.image) &&
      !imagePath.current
    ) {
      const id = getId(location.pathname);
      if (id) imagePath.current = id;
      else throw new Error("image id is missing");
    } else {
      if (!imagePath.current && folderScreen.current) {
        scrollTop.current = folderScreen.current.scrollTop;
      }
    }
  }, [location]);

  if (loading || !folderScreen) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  console.log("==> 1");

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
