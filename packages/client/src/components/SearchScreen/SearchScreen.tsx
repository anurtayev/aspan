import { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  MetaDataForm,
  getFolderPathname,
  StateContext,
  GetRepoMetaData,
  GET_REPO_METADATA,
} from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreen = () => {
  const history = useHistory();
  const ctx = useContext(StateContext);

  const { loading, error, data } = useQuery<GetRepoMetaData>(
    GET_REPO_METADATA,
    {
      fetchPolicy: "no-cache",
    }
  );

  if (!ctx) throw new Error("context error");
  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error</p>;

  const { tags, attributes } = data;

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
      onSubmit={({ tags, attributes }, { setSubmitting }) => {
        setSubmitting(false);

        history.push(
          getFolderPathname({
            metaDataInput: {
              tags: tags || [],
              attributes: attributes || [],
            },
          })
        );
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <MetaDataPartialForm
            availableAttributes={attributes}
            availableTags={tags}
          />

          <Section>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <button type="button" onClick={() => history.goBack()}>
              Cancel
            </button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
