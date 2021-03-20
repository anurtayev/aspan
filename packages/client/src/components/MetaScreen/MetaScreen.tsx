import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  useEntryId,
  Characters,
  Button,
  MetaDataForm,
  SET_METADATA,
  AspanContext,
  getFolderPathname,
} from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";
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
  const ctx = useContext(AspanContext);

  const [setMetaData] = useMutation(SET_METADATA);

  if (!ctx?.repoVariables) throw new Error("context error");

  const {
    repo: { entries, tags: availableTags, attributes: availableAttributes },
    repoVariables,
  } = ctx;

  const entry = entries.find((entry) => entry.id === entryId);

  if (!entry) throw new Error("entry not found");

  const { metaData, __typename } = entry;

  const goBack = () => {
    history.push(getFolderPathname(repoVariables));
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
