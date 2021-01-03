import { Maybe, MetaData, MetaDataInput, Scalars } from "../generated/graphql";

export const addTag = (
  metaData: Maybe<MetaData>,
  tag: Scalars["String"]
): MetaData => {
  if (!metaData) {
    return { __typename: "MetaData", tags: [tag] };
  }

  if (!metaData.tags) {
    return { ...metaData, tags: [tag] };
  }

  if (!Array.isArray(metaData.tags)) {
    throw new Error("addTag: metaData.tags must be an array");
  }

  if (metaData.tags.some(_ => tag === _)) {
    return metaData;
  }

  return { ...metaData, tags: [...metaData.tags, tag] };
};

export const removeTag = (
  metaData: Maybe<MetaData>,
  tag: Scalars["String"]
): MetaData => {
  if (!metaData) {
    throw new Error("removeTag: metaData must be an instance of MetaData");
  }

  if (!metaData.tags) {
    return metaData;
  }

  if (!Array.isArray(metaData.tags)) {
    throw new Error("removeTag: metaData.tags must be an array");
  }

  return {
    ...metaData,
    tags: metaData.tags.filter(_ => _ !== tag)
  };
};

export const addAttribute = (
  metaData: Maybe<MetaData>,
  attribute: Array<Scalars["String"]>
): MetaData => {
  if (!metaData) {
    return { __typename: "MetaData", attributes: [attribute] };
  }

  if (!metaData.attributes) {
    return { ...metaData, attributes: [attribute] };
  }

  if (!Array.isArray(metaData.attributes)) {
    throw new Error("addAttribute: metaData.attributes must be an array");
  }

  const key = attribute[0];
  const existingElemIndex = metaData.attributes.findIndex(_ => key === _[0]);
  if (existingElemIndex > -1) {
    return {
      ...metaData,
      attributes: [
        ...metaData.attributes.slice(0, existingElemIndex),
        attribute,
        ...metaData.attributes.slice(existingElemIndex + 1)
      ]
    };
  }

  return { ...metaData, attributes: [...metaData.attributes, attribute] };
};

export const removeAttribute = (
  metaData: Maybe<MetaData>,
  attribute: Scalars["String"]
): MetaData => {
  if (!metaData) {
    throw new Error(
      "removeAttribute: metaData must be an instance of MetaData"
    );
  }

  if (!metaData.attributes) {
    return metaData;
  }

  if (!Array.isArray(metaData.attributes)) {
    throw new Error("removeAttribute: metaData.attributes must be an array");
  }

  const attributeIndex = metaData.attributes.findIndex(_ => _[0] === attribute);
  return {
    ...metaData,
    attributes: [
      ...metaData.attributes.slice(0, attributeIndex),
      ...metaData.attributes.slice(attributeIndex + 1)
    ]
  };
};

export const satisfiesFilter = (
  metaData: Maybe<MetaData>,
  filterMetaData: Maybe<MetaDataInput> | undefined
): boolean => {
  // no filter
  if (
    !filterMetaData ||
    typeof filterMetaData !== "object" ||
    (!filterMetaData.tags && !filterMetaData.attributes)
  )
    return true;

  // there is a filter but no metadata
  if (!metaData) return false;

  // check if all filter tags are subset of tags
  if (
    filterMetaData.tags &&
    !filterMetaData.tags?.every(tag => metaData.tags?.includes(tag))
  )
    return false;

  // check if filter attributes are subset of attributes
  // and have matching values
  if (
    filterMetaData.attributes &&
    !filterMetaData.attributes?.every(([filterKey, filterValue]) =>
      metaData.attributes?.some(
        ([key, value]) => key === filterKey && value === filterValue
      )
    )
  )
    return false;

  return true;
};
