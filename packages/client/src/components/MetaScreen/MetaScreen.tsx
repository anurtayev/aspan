import { useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  useEntryId,
  Characters,
  Button,
  MetaDataForm,
  SET_METADATA,
  GET_METADATA,
  GetMetaData,
  GetMetaDataVariables,
  SetMetaData,
  SetMetaDataVariables,
  useAspanContext,
  getGoBackPath,
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
  const ctx = useAspanContext();

  const [setMetaData] = useMutation<SetMetaData, SetMetaDataVariables>(
    SET_METADATA
  );

  const { loading, error, data } = useQuery<GetMetaData, GetMetaDataVariables>(
    GET_METADATA,
    {
      variables: { id: entryId },
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error</p>;

  const { entry, tags, attributes } = data;
  if (!entry) throw new Error("entry not found");

  const { metaData, __typename } = entry;

  const initialValues: MetaDataForm = {
    tags: metaData && metaData.tags ? metaData.tags : [],
    attributes: metaData && metaData.attributes ? metaData.attributes : [],
    newTag: "",
    newKey: "",
    newValue: "",
  };

  const goBack = () => history.push(getGoBackPath(ctx));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const { newKey, newValue, newTag, tags, attributes } = values;
        setMetaData({
          variables: {
            id: entryId,
            metaDataInput: {
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
            availableAttributes={attributes}
            availableTags={tags}
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
