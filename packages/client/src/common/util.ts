import { useLocation } from "react-router-dom";

export const pathPrefix = { folder: "/folder", image: "/image", meta: "/meta" };

export enum entryType {
  folder = "Folder",
  file = "File",
}

const removePathPrefixRegExp = new RegExp(
  `^(${pathPrefix.folder}|${pathPrefix.image}|${pathPrefix.meta})`
);

export const useEntryId = () => {
  const location = useLocation();
  return location.pathname.replace(removePathPrefixRegExp, "");
};
