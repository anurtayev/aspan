import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getMetaData } from "./queries";
import Error from "components/Error";
import Loading from "components/Loading";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";
import useSaveMeta from "./useSaveMeta";

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

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getMetaData(id));

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <FormFrame>
      <Formik
        initialValues={data.getEntry.metaData}
        onSubmit={({ values }) => {
          useSaveMeta({ id, metaData: values });
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
                          (attribute: [string], index: number) => (
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
              </FormBody>
            </>
          );
        }}
      </Formik>
    </FormFrame>
  );
};
