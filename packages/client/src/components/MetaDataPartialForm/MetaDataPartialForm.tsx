import React, { useState } from "react";
import { FieldArray, Field, useFormikContext } from "formik";
import styled from "styled-components";

import { Characters, FormBrick, SmallButton, MetaDataForm } from "common";
import { Selections } from "./Selections";

type Params = { availableTags: string[]; availableAttributes: string[] };

export const MetaDataPartialForm = ({
  availableTags,
  availableAttributes,
}: Params) => {
  const {
    values: { tags, attributes, newTag, newKey, newValue },
    setFieldValue,
  } = useFormikContext<MetaDataForm>();

  const [isNewTagFocused, setIsNewTagFocused] = useState(false);
  const [isNewTagSelected, setIsNewTagSelected] = useState(false);
  const [isNewKeyFocused, setIsNewKeyFocused] = useState(false);
  const [isNewKeySelected, setIsNewKeySelected] = useState(false);

  return (
    <>
      <Section>
        <SectionHeader>TAGS</SectionHeader>
        <FieldArray
          name="tags"
          render={({ remove, push }) => (
            <>
              <ExistingItemsBox>
                {tags &&
                  tags.map((tag: string, index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{tag}</ElemBox>
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormBrick>
                  ))}
              </ExistingItemsBox>

              <FormBrick>
                <Field
                  name="newTag"
                  autoComplete="off"
                  onFocus={() => {
                    setIsNewTagSelected(false);
                    setIsNewTagFocused(true);
                  }}
                  onBlur={() => {
                    setIsNewTagFocused(false);
                  }}
                />
                <SmallButton
                  onClick={() => {
                    const newTagValue = newTag.trim();
                    !tags?.includes(newTagValue) && push(newTag.trim());
                    setFieldValue("newTag", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newTag}
                selections={availableTags}
                setNewValue={(selectedValue: string) =>
                  setFieldValue("newTag", selectedValue)
                }
                isInputFocused={isNewTagFocused}
                isSelected={isNewTagSelected}
                setIsSelected={setIsNewTagSelected}
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
              <ExistingItemsBox>
                {attributes &&
                  attributes.map((attribute: string[], index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{attribute[0]}</ElemBox>
                      <Field
                        name={`attributes.${index}.1`}
                        value={attribute[1]}
                      />
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormBrick>
                  ))}{" "}
              </ExistingItemsBox>

              <FormBrick>
                <Field
                  name="newKey"
                  autoComplete="off"
                  onFocus={() => setIsNewKeyFocused(true)}
                  onBlur={() => setIsNewKeyFocused(false)}
                />
                <Field name="newValue" />
                <SmallButton
                  onClick={() => {
                    const newKeyValue = newKey.trim();
                    if (
                      !attributes?.find(
                        (attribute) => attribute[0] === newKeyValue
                      )
                    )
                      push([newKeyValue, newValue.trim()]);
                    setFieldValue("newKey", "");
                    setFieldValue("newValue", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newKey}
                selections={availableAttributes}
                setNewValue={(selectedValue: string) =>
                  setFieldValue("newKey", selectedValue)
                }
                isInputFocused={isNewKeyFocused}
                isSelected={isNewKeySelected}
                setIsSelected={setIsNewKeySelected}
              />
            </>
          )}
        />
      </Section>
    </>
  );
};

const Section = styled.div`
  margin: 1rem 0 0 2rem;
`;

const SectionHeader = styled.h5`
  color: red;
  margin: 0 0 0.2rem 0;
`;

const ElemBox = styled.div`
  border: 1px solid;
  padding: 0 0.5rem 0 0.5rem;
  background: lightgrey;
`;

const ExistingItemsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
