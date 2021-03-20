import { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import { Button, MetaDataForm, getFolderPathname, AspanContext } from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreen = () => {
  const history = useHistory();
  const ctx = useContext(AspanContext);

  if (!ctx?.repoVariables) throw new Error("context error");

  const {
    repo: { tags: availableTags, attributes: availableAttributes },
    repoVariables,
  } = ctx;

  const initialValues: MetaDataForm = {
    tags: [],
    attributes: [],
    newTag: "",
    newKey: "",
    newValue: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        { tags, attributes, newTag, newKey, newValue },
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
            metaDataInput: {
              tags,
              attributes,
            },
          })
        );
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
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
              onClick={() => history.push(getFolderPathname(repoVariables))}
            >
              Cancel
            </Button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
