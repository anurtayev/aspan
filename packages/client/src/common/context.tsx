import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  createRef,
  RefObject,
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
  imagePath: string | null;
  scrollTop: number;
  repoVariables: RepoVariables;
  folderScreenRef: RefObject<HTMLDivElement>;
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
  const [repoVariables, setRepoVariables] = useState<RepoVariables>();
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [imagePath, setImagePath] = useState<string>("");
  const folderScreenRef = createRef<HTMLDivElement>();

  const { loading, error, data } = useQuery<Repo, RepoVariables>(
    FOLDER_ENTRIES,
    {
      variables: repoVariables,
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (location.pathname.startsWith(pathPrefix.folder)) {
      setRepoVariables(getVariables(location));
      setScrollTop(0);
      setImagePath("");
    } else {
      if (location.pathname.startsWith(pathPrefix.image)) {
        setImagePath(imagePath ? "" : getId(location.pathname));
      }

      !imagePath &&
        folderScreenRef.current &&
        setScrollTop(folderScreenRef.current.scrollTop);
    }
  }, [location, folderScreenRef, imagePath]);

  if (loading || !repoVariables) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const contextValue: AspanContextType = {
    scrollTop,
    repo: data,
    imagePath,
    repoVariables,
    folderScreenRef,
  };

  return (
    <AspanContext.Provider value={contextValue}>
      {children}
    </AspanContext.Provider>
  );
};
