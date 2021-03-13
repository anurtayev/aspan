import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  useEntryId,
  GetMetaData,
  GetMetaDataVariables,
  pathPrefix,
  Characters,
  Button,
  MetaDataForm,
} from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";
import { GET_METADATA, SET_METADATA } from "./queries";
import {
  FlexForm,
  EntryName,
  Section,
  PictureSymbol,
  SubmitButton,
} from "./MetaScreen.styles";

export const MetaScreen = () => {
  const history = useHistory();
  const entryId = useEntryId();

  const { loading, error, data } = useQuery<GetMetaData, GetMetaDataVariables>(
    GET_METADATA,
    {
      variables: { entryId },
      fetchPolicy: "no-cache",
    }
  );

  const [setMetaData] = useMutation(SET_METADATA);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entry) return <p>Error. No such entry</p>;

  const {
    entry: { __typename, metaData },
    tags: availableTags,
    attributes: availableAttributes,
  } = data;

  const goBack = () => {
    history.push(
      (__typename === "Folder" ? pathPrefix.folder : pathPrefix.image) + entryId
    );
  };

  const initialValues: MetaDataForm = {
    tags: metaData && metaData.tags ? metaData.tags : [],
    attributes: metaData && metaData.attributes ? metaData.attributes : [],
    newTag: "",
    newKey: "",
    newValue: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const { newKey, newValue, newTag, tags, attributes } = values;
        setMetaData({
          variables: {
            id: entryId,
            metaData: {
              tags: [...(tags ? tags : []), ...(newTag ? [newTag.trim()] : [])],
              attributes: [
                ...(attributes ? attributes : []),
                ...(newKey && newValue
                  ? [[newKey.trim(), newValue.trim()]]
                  : []),
              ],
            },
          },
        });
        setSubmitting(false);
        goBack();
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <Section>
            <PictureSymbol>
              {__typename === "Folder" ? Characters.folder : Characters.file}
            </PictureSymbol>
            <EntryName>{entryId.split("/").slice(-1)[0]}</EntryName>
          </Section>

          <MetaDataPartialForm
            availableAttributes={availableAttributes}
            availableTags={availableTags}
          />

          <Section>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <Button type="button" onClick={goBack}>
              Cancel
            </Button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
