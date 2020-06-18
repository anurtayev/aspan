import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { META_DATA, UPDATE_META_DATA } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import {
  MetaData,
  MetaDataInput,
  MetaDataForm,
  useNavigateToImage,
} from "aspanUtils";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";

const FormFrame = styled.div`
  margin: 1em;
  background: red;
  heigh: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const FormBody = styled(Form)`
  border: solid black;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 20% 80%;
`;

const unboxMetaData = (meta: MetaData | null): MetaDataForm => {
  const { __typename, tags, ...noTypeName } = meta || {};

  console.log("==> noTypeName", noTypeName);

  const newMeta: MetaDataForm = noTypeName;
  newMeta.favorite = tags && tags.includes("favorite");
  newMeta.print = tags && tags.includes("print");
  newMeta.tags =
    tags && tags.filter((element) => !["favorite", "print"].includes(element));
  return newMeta;
};

const boxMetaData = (meta: MetaDataForm): MetaDataInput | undefined => {
  console.log("==> 1", meta);

  if (meta && typeof meta === "object" && Reflect.ownKeys(meta).length > 0) {
    const { title, description, attributes, tags, favorite, print } = meta;
    const newMeta: MetaDataInput = {
      title,
      description,
      attributes:
        Array.isArray(attributes) && attributes.length > 0
          ? attributes
          : undefined,
    };
    let newTags = tags || [];
    if (favorite) newTags = [...newTags, "favorite"];
    if (print) newTags = [...newTags, "print"];
    if (tags && tags.length > 0) newMeta.tags = tags;
    return newMeta;
  } else return undefined;
};

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(META_DATA, {
    fetchPolicy: "no-cache",
    variables: { id },
  });
  const [saveMeta] = useMutation(UPDATE_META_DATA);
  const navigateToImage = useNavigateToImage();

  if (loading) return <Loading />;
  if (error) return <Error />;

  console.log("==> read meta", data.getEntry.metaData);

  return (
    <FormFrame>
      <Formik
        initialValues={unboxMetaData(data.getEntry.metaData)}
        onSubmit={(values, { setSubmitting }) => {
          saveMeta({
            variables: {
              id,
              metaData: boxMetaData(values),
            },
          });
          navigateToImage(id);
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <>
              <FormBody>
                <label htmlFor="title">Title</label>
                <Field type="text" name="title"></Field>
                <label htmlFor="title">Description</label>
                <Field type="text" name="description"></Field>
                <label htmlFor="favorite">Favorite</label>
                <Field type="checkbox" name="favorite"></Field>
                <label htmlFor="print">Print</label>
                <Field type="checkbox" name="print"></Field>
                <label htmlFor="tags">Tags</label>
                <FieldArray name="tags">
                  {(arrayHelpers) => (
                    <div>
                      {values.tags && values.tags.length > 0 ? (
                        values.tags.map((tag: string, index: number) => (
                          <div key={index}>
                            <Field name={`tags[${index}]`} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")}
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a tag
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <label htmlFor="attributes">Attributes</label>
                <FieldArray name="attributes">
                  {(arrayHelpers) => (
                    <div>
                      {values.attributes && values.attributes.length > 0 ? (
                        values.attributes.map(
                          (attribute: string[], index: number) => (
                            <div key={index}>
                              <Field name={`attributes[${index}]`} />
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.insert(index, "")}
                              >
                                +
                              </button>
                            </div>
                          )
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a tag
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
              </FormBody>
            </>
          );
        }}
      </Formik>
    </FormFrame>
  );
};
