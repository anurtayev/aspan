import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  Characters,
  Button,
  MetaDataForm,
  SET_METADATA,
  GET_METADATA,
  GetMetaData,
  GetMetaDataVariables,
  SetMetaData,
  SetMetaDataVariables,
  StateContext,
  getId,
} from "common";
import { MetaDataPartialForm } from "components/MetaDataPartialForm";

export const MetaScreen = () => {
  const history = useHistory();
  const { imagePathname, folderPathname, search } = useContext(StateContext);
  const { pathname } = useLocation();
  const id = getId(pathname);

  const [setMetaData] =
    useMutation<SetMetaData, SetMetaDataVariables>(SET_METADATA);

  const { loading, error, data } = useQuery<GetMetaData, GetMetaDataVariables>(
    GET_METADATA,
    {
      variables: { id },
      fetchPolicy: "no-cache",
    }
  );

  if (loading || !data) return <p>Loading</p>;
  if (error) return <p>Error</p>;

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

  const goBack = () => history.push(imagePathname || folderPathname + search);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const { newKey, newValue, newTag, tags, attributes } = values;
        setMetaData({
          variables: {
            id,
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
            <EntryName>{id.split("/").slice(-1)[0]}</EntryName>
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

const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Section = styled.div`
  margin: 1rem 0 0 2rem;
`;

const PictureSymbol = styled.span`
  font-size: 1.5rem;
`;

const EntryName = styled.span`
  font-size: 1rem;
  margin: 0 0 0 1rem;
`;

const SubmitButton = styled(Button)`
  background: deepskyblue;
`;
