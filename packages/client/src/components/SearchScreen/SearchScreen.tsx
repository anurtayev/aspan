import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Field, Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  GetExistingMetaKeys,
  Button,
  MetaDataForm,
  FormLine,
  getFolderPathname,
  AspanContext,
  getLastPointer,
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
  const ctx = useContext(AspanContext);

  const { loading, error, data } = useQuery<GetExistingMetaKeys>(
    GET_EXISTING_META_KEYS
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data || !ctx) return <p>Error :(</p>;

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

        history.push(
          getFolderPathname({
            id: "",
            scrollTop: 0,
            tags,
            attributes,
            idSubstring,
          })
        );
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
              onClick={() =>
                history.push(getFolderPathname(getLastPointer(ctx)))
              }
            >
              Cancel
            </Button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
