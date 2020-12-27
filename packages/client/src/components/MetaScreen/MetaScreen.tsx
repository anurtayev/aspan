import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useField, Form, Field, FieldArray } from "formik";

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

const AttributeField = ({ name }: { name: string }) => {
  const [field, meta, helpers] = useField<string[]>(name);
  return (
    <div>
      <input
        type="text"
        name={field.name + ".key"}
        value={field.value[0]}
        onChange={(e) => {
          helpers.setValue([e.target.value, field.value[1]]);
        }}
      />
      <input
        type="text"
        name={field.name + ".value"}
        value={field.value[1]}
        onChange={(e) => {
          helpers.setValue([field.value[0], e.target.value]);
        }}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
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
        setSubmitting(false);
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
                  values.attributes.map(
                    (attribute: string[], index: number) => (
                      <div key={index}>
                        <AttributeField name={`attributes.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, ["", ""])}
                        >
                          +
                        </button>
                      </div>
                    )
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push(["", ""])}
                  >
                    Add an attribute
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
