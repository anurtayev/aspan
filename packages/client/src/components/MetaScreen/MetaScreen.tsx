import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Field, FieldArray } from "formik";
import { useHistory } from "react-router-dom";

import {
  useEntryId,
  GetMetaData,
  GetMetaDataVariables,
  pathPrefix,
} from "common";
import { GET_METADATA, SET_METADATA } from "./queries";
import { NewAttribute } from "./NewAttribute";
import { NewTag } from "./NewTag";
import { Attribute } from "./Attribute";
import { Frame } from "./MetaScreen.styles";

export const MetaScreen = () => {
  const history = useHistory();
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
      initialValues={
        (metaData && {
          tags: metaData.tags,
          attributes: metaData.attributes,
        }) ||
        {}
      }
      onSubmit={(values, { setSubmitting }) => {
        setMetaData({ variables: { id: entryId, metaData: values } });
        setSubmitting(false);
        history.push(
          (__typename === "Folder" ? pathPrefix.folder : pathPrefix.image) +
            entryId
        );
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div>
            {__typename}: {id.split("/").slice(-1)[0]}
          </div>

          <div>TAGS</div>
          <FieldArray
            name="tags"
            render={({ remove, push }) => (
              <div>
                {values.tags &&
                  values.tags.map((tag: string, index: number) => (
                    <div key={index}>
                      <Field name={`tags.${index}`} />
                      <button type="button" onClick={() => remove(index)}>
                        &#x232b;
                      </button>
                    </div>
                  ))}
                <NewTag push={push} />
              </div>
            )}
          />

          <div>ATTRIBUTES</div>
          <FieldArray
            name="attributes"
            render={({ remove, push }) => (
              <div>
                {values.attributes &&
                  values.attributes.map(
                    (attribute: string[], index: number) => (
                      <div key={index}>
                        <Attribute
                          name={`attributes.${index}`}
                          index={index}
                          remove={remove}
                        />
                      </div>
                    )
                  )}
                <NewAttribute push={push} />
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
