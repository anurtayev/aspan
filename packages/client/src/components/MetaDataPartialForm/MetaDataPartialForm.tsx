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
      <div>
        <SectionHeader>Tags</SectionHeader>
        <FieldArray
          name="tags"
          render={({ remove, push }) => (
            <>
              <ExistingItemsContainer>
                {tags &&
                  tags.map((tag: string, index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{tag}</ElemBox>
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormBrick>
                  ))}
              </ExistingItemsContainer>

              <FormBrick>
                <StyledField
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
      </div>

      <div>
        <SectionHeader>Attributes</SectionHeader>
        <FieldArray
          name="attributes"
          render={({ remove, push }) => (
            <>
              <ExistingItemsContainer>
                {attributes &&
                  attributes.map((attribute: string[], index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{attribute[0]}</ElemBox>
                      <StyledField
                        name={`attributes.${index}.1`}
                        value={attribute[1]}
                      />
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormBrick>
                  ))}{" "}
              </ExistingItemsContainer>

              <FormBrick>
                <StyledField
                  name="newKey"
                  autoComplete="off"
                  onFocus={() => setIsNewKeyFocused(true)}
                  onBlur={() => setIsNewKeyFocused(false)}
                />
                <StyledField name="newValue" />
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
      </div>
    </>
  );
};

const SectionHeader = styled.h5`
  color: #1187f6;
  margin: 0 0 0.2rem 0;
`;

const ElemBox = styled.div`
  border: 1px solid;
  padding: 0 0.2rem 0 0.2rem;
  background: lightgrey;
  height: 1rem;
  font-size: 0.75rem;
`;

const ExistingItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledField = styled(Field)`
  height: 0.76rem;
  width: 40%;
`;
