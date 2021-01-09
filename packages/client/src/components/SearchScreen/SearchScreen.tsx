import React from "react";
import { useQuery } from "@apollo/client";
import { Field, Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  pathPrefix,
  GetExistingMetaKeys,
  Button,
  MetaDataForm,
  FormLine,
} from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";
import { GET_EXISTING_META_KEYS } from "./queries";
import {
  FlexForm,
  Section,
  SubmitButton,
  SectionHeader,
} from "./SearchScreen.styles";

export const SearchScreen = () => {
  const history = useHistory();

  const { loading, error, data } = useQuery<GetExistingMetaKeys>(
    GET_EXISTING_META_KEYS
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  const { tags: availableTags, attributes: availableAttributes } = data;

  const initialValues: MetaDataForm & { idSubstring: string } = {
    tags: [],
    attributes: [],
    newTag: "",
    newKey: "",
    newValue: "",
    idSubstring: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        { idSubstring, tags, attributes, newTag, newKey, newValue },
        { setSubmitting }
      ) => {
        setSubmitting(false);

        tags = [...(tags ? tags : []), ...(newTag ? [newTag] : [])];
        attributes = [
          ...(attributes ? attributes : []),
          ...(newKey && newValue ? [[newKey, newValue]] : []),
        ];

        let queryString = "";

        if (
          idSubstring ||
          (tags && tags.length > 0) ||
          (attributes && attributes.length > 0)
        ) {
          const idSubstringPart = idSubstring
            ? "idSubstring=" + idSubstring
            : "";

          const tagsPart =
            tags && tags.length > 0
              ? tags.map((tag) => "tags=" + tag).join("&")
              : "";

          const attributesPart =
            attributes && attributes.length > 0
              ? attributes
                  .map((attribute) => "attributes=" + attribute.join(","))
                  .join("&")
              : "";

          queryString =
            "?" +
            idSubstringPart +
            (idSubstringPart ? "&" : "") +
            tagsPart +
            (idSubstringPart || tagsPart ? "&" : "") +
            attributesPart;
        }

        history.push(pathPrefix.folder + queryString);
      }}
    >
      {({ isSubmitting, values: { idSubstring } }) => (
        <FlexForm>
          <Section>
            <SectionHeader>Enter name substring</SectionHeader>
            <FormLine>
              <Field name="idSubstring" />
            </FormLine>
          </Section>

          <MetaDataPartialForm
            availableAttributes={availableAttributes}
            availableTags={availableTags}
          />

          <Section>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <Button
              type="button"
              onClick={() => history.push(pathPrefix.folder + "/")}
            >
              Cancel
            </Button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
