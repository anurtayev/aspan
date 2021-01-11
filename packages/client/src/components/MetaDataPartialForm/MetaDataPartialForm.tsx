import React, { useState } from "react";
import { FieldArray, Field, useFormikContext } from "formik";

import { Characters, FormLine, SmallButton, MetaDataForm } from "common";
import { Selections } from "./Selections";
import {
  Section,
  SectionHeader,
  ElemBox,
  ExistingItemsBox,
} from "./MetaDataPartialForm.styles";

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
                    <FormLine key={index}>
                      <ElemBox>{tag}</ElemBox>
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormLine>
                  ))}
              </ExistingItemsBox>

              <FormLine>
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
                    push(newTag.trim());
                    setFieldValue("newTag", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormLine>
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
                    <FormLine key={index}>
                      <ElemBox>{attribute[0]}</ElemBox>
                      <Field
                        name={`attributes.${index}.1`}
                        value={attribute[1]}
                      />
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormLine>
                  ))}{" "}
              </ExistingItemsBox>

              <FormLine>
                <Field
                  name="newKey"
                  autoComplete="off"
                  onFocus={() => setIsNewKeyFocused(true)}
                  onBlur={() => setIsNewKeyFocused(false)}
                />
                <Field name="newValue" />
                <SmallButton
                  onClick={() => {
                    push([newKey.trim(), newValue.trim()]);
                    setFieldValue("newKey", "");
                    setFieldValue("newValue", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormLine>
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
