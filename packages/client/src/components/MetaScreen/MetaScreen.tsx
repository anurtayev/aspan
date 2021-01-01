import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FieldArray, Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  useEntryId,
  GetMetaData,
  GetMetaDataVariables,
  pathPrefix,
  Characters,
  Button,
} from "common";
import { GET_METADATA, SET_METADATA } from "./queries";
import { NewAttribute } from "./NewAttribute";
import { NewTag } from "./NewTag";
import { Attribute } from "./Attribute";
import { Tag } from "./Tag";
import {
  Frame,
  EntryName,
  Section,
  PictureSymbol,
  SubmitButton,
  SectionHeader,
} from "./MetaScreen.styles";

export const MetaScreen = () => {
  const history = useHistory();
  const entryId = useEntryId();

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTag, setNewTag] = useState("");

  const { loading, error, data } = useQuery<GetMetaData, GetMetaDataVariables>(
    GET_METADATA,
    {
      variables: { id: entryId },
      fetchPolicy: "no-cache",
    }
  );

  const [setMetaData] = useMutation(SET_METADATA);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;
  if (!data.entry) return <p>Error. No such entry</p>;

  const {
    entry: { __typename, id, metaData },
    tags,
    attributes,
  } = data;

  const goBack = () => {
    history.push(
      (__typename === "Folder" ? pathPrefix.folder : pathPrefix.image) + entryId
    );
  };

  return (
    <Formik
      initialValues={
        (metaData && {
          tags: metaData.tags,
          attributes: metaData.attributes,
        }) ||
        {}
      }
      onSubmit={(values, { setSubmitting }) => {
        if (newKey && newValue) {
          values.attributes = [
            ...(values.attributes ? values.attributes : []),
            [newKey, newValue],
          ];
        }

        if (newTag) {
          values.tags = [...(values.tags ? values.tags : []), newTag];
        }

        setMetaData({ variables: { id: entryId, metaData: values } });
        setSubmitting(false);
        goBack();
      }}
    >
      {({ isSubmitting, values }) => (
        <Frame>
          <Section>
            <PictureSymbol>
              {__typename === "Folder" ? Characters.folder : Characters.file}
            </PictureSymbol>
            <EntryName>{id.split("/").slice(-1)[0]}</EntryName>
          </Section>

          <Section>
            <SectionHeader>TAGS</SectionHeader>
            <FieldArray
              name="tags"
              render={({ remove, push }) => (
                <>
                  {values.tags &&
                    values.tags.map((tag: string, index: number) => (
                      <Tag
                        key={index}
                        name={`tags.${index}`}
                        remove={remove}
                        index={index}
                        tags={tags}
                      />
                    ))}
                  <NewTag
                    setNewTag={setNewTag}
                    newTag={newTag}
                    push={push}
                    tags={tags}
                  />
                </>
              )}
            />
          </Section>

          <Section>
            <SectionHeader>ATTRIBUTES</SectionHeader>
            <FieldArray
              name="attributes"
              render={({ remove, push }) => (
                <>
                  {values.attributes &&
                    values.attributes.map(
                      (attribute: string[], index: number) => (
                        <Attribute
                          key={index}
                          name={`attributes.${index}`}
                          index={index}
                          remove={remove}
                          attributes={attributes}
                        />
                      )
                    )}
                  <NewAttribute
                    push={push}
                    newKey={newKey}
                    newValue={newValue}
                    setNewKey={setNewKey}
                    setNewValue={setNewValue}
                    attributes={attributes}
                  />
                </>
              )}
            />
          </Section>

          <Section>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <Button type="button" onClick={goBack}>
              Cancel
            </Button>
          </Section>
        </Frame>
      )}
    </Formik>
  );
};
