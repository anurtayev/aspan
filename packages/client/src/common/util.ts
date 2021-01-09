import { useLocation } from "react-router-dom";
import { MetaDataInput } from "./graphqlTypes";

export const pathPrefix: { [key: string]: string } = {
  folder: "/folder",
  image: "/image",
  meta: "/meta",
  search: "/search",
};

export enum entryType {
  folder = "Folder",
  file = "File",
}

const pathPrefixesRegExp = new RegExp(
  `^(${pathPrefix.folder}|${pathPrefix.image}|${pathPrefix.meta})`
);

export const getId = (pathname: string) =>
  pathname.replace(pathPrefixesRegExp, "");

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
  plus = "\u{002b}",
  multiply = "\u{00d7}",
  home = "\u{1F3E0}",
  arrowUp = "\u{21e7}",
  arrowLeft = "\u{21e6}",
  arrowRight = "\u{21e8}",
  label = "\u{1f3f7}",
  magnifyingGlass = "\u{1F50D}",
}

export type MetaDataForm = MetaDataInput & {
  newTag: string;
  newKey: string;
  newValue: string;
};
