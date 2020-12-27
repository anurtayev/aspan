import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Field, FieldArray } from "formik";

import {
  useEntryId,
  GetMetaData,
  GetMetaDataVariables,
  GetMetaData_entry_metaData,
  MetaDataInput,
} from "common";
import { Frame } from "./MetaScreen.styles";
import { GET_METADATA, SET_METADATA } from "./queries";

const getInitialValues = (
  metaData: GetMetaData_entry_metaData | null
): MetaDataInput => {
  return {
    tags: (metaData && metaData.tags) || [],
    attributes: (metaData && metaData.attributes) || [[]],
  };
};

export const MetaScreen = () => {
  const entryId = useEntryId();

  const { loading, error, data: getData } = useQuery<
    GetMetaData,
    GetMetaDataVariables
  >(GET_METADATA, {
    variables: { id: entryId },
    fetchPolicy: "no-cache",
  });

  const [setMetaData] = useMutation(SET_METADATA);

  if (loading) return <p>Loading...</p>;
  if (error || !getData) return <p>Error :(</p>;
  if (!getData.entry) return <p>Error. No such entry</p>;

  const { __typename, id, metaData } = getData.entry;

  return (
    <Frame
      initialValues={getInitialValues(metaData)}
      onSubmit={(values, { setSubmitting }) => {
        setMetaData({ variables: { id: entryId, metaData: values } });
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div>
            {__typename} - {id}
          </div>

          <div>TAGS</div>
          <FieldArray
            name="tags"
            render={(arrayHelpers) => (
              <div>
                {values.tags && values.tags.length > 0 ? (
                  values.tags.map((tag: string, index: number) => (
                    <div key={index}>
                      <Field name={`tags.${index}`} />
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
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    Add a tag
                  </button>
                )}
              </div>
            )}
          />

          <div>ATTRIBUTES</div>
          <FieldArray
            name="attributes"
            render={(arrayHelpers) => (
              <div>
                {values.attributes && values.attributes.length > 0 ? (
                  values.attributes.map((tag: string, index: number) => (
                    <div key={index}>
                      <Field name={`attributes.${index}`} />
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
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    Add a tag
                  </button>
                )}
              </div>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Frame>
  );
};
