import { useLocation } from "react-router-dom";
import { MetaDataInput } from "./graphqlTypes";

import { Pointer, AspanContextType } from "./context";

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

export const getFolderPathname = ({
  id,
  scrollTop,
  tags,
  attributes,
  idSubstring,
}: Pointer) => {
  let queryString = "";

  const idSubstringPart = idSubstring ? "&idSubstring=" + idSubstring : "";

  const tagsPart =
    tags && tags.length > 0 ? tags.map((tag) => "tags=" + tag).join("&") : "";

  const attributesPart =
    attributes && attributes.length > 0
      ? attributes
          .map((attribute) => "attributes=" + attribute.join(","))
          .join("&")
      : "";

  queryString =
    "?scrollTop=" +
    scrollTop +
    idSubstringPart +
    (tagsPart ? "&" + tagsPart : "") +
    (attributesPart ? "&" + attributesPart : "");

  return pathPrefix.folder + id + queryString;
};

export const getLastPointer = (ctx: AspanContextType) => {
  const pointers = ctx.returnPositions[0];
  const lastPointer = pointers.slice(-1)[0];
  ctx.returnPositions[1](pointers.slice(0, -1));
  return lastPointer;
};
