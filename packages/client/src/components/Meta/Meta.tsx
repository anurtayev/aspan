import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";

import { META_DATA, UPDATE_META_DATA } from "./queries";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useUpdateLocalState, useLocalState, ROUTE_REGISTRY } from "aspanUtils";
import { getMetaDataQuery } from "./__generated__/getMetaDataQuery";
import { MetaDataInput } from "../../../__generated__/globalTypes";

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

export const Meta = () => {
  const { loading: stateLoading, data: stateData } = useLocalState();

  const { id, prevDisplayComponent, prevId, prevScrollY } = stateData;

  const { loading, error, data } = useQuery(META_DATA, {
    fetchPolicy: "no-cache",
    variables: { id },
  });
  const [saveMeta] = useMutation(UPDATE_META_DATA);
  const updateLocalState = useUpdateLocalState();

  if (stateLoading) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <Error />;

  const { getEntry } = data as getMetaDataQuery;

  if (getEntry === null) return <Error message="No such entry" />;

  const { metaData } = getEntry;

  const formData = {
    tags:
      metaData && metaData.tags && metaData.tags.length > 0
        ? metaData.tags
        : [],
    attributes:
      metaData && metaData.attributes && metaData.attributes.length > 0
        ? metaData.attributes.map((arrayElement) => arrayElement.join(","))
        : [],
  };

  return (
    <FormFrame>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          const { tags, attributes } = values;

          const metaData: MetaDataInput = {
            tags,
            attributes: attributes.map((rawArray) => rawArray.split(",")),
          };

          saveMeta({
            variables: {
              id,
              metaData,
            },
          });

          updateLocalState({
            displayComponent: prevDisplayComponent,
            prevDisplayComponent: ROUTE_REGISTRY.meta,
            id: prevId,
            prevId: id,
            scrollY: prevScrollY,
            prevScrollY: window.scrollY,
          });
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <>
              <FormBody>
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
                          (attribute: string, index: number) => (
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
                          Add a attribute
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
