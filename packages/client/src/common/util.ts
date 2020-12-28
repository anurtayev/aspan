import { useLocation } from "react-router-dom";

export const pathPrefix: { [key: string]: string } = {
  folder: "/folder",
  image: "/image",
  meta: "/meta",
};

export enum entryType {
  folder = "Folder",
  file = "File",
}

const pathPrefixesRegExp = new RegExp(
  `^(${pathPrefix.folder}|${pathPrefix.image}|${pathPrefix.meta})`
);

export const useEntryId = () => {
  const { pathname } = useLocation();
  return pathname.replace(pathPrefixesRegExp, "");
};

export enum systemAttributes {
  favorite = "favorite",
  hidden = "hidden",
}
