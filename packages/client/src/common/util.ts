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

export enum Characters {
  check = "\u{2713}",
  delete = "\u{232b}",
  file = "\u{1F5BC}",
  folder = "\u{1F4C1}",
}
