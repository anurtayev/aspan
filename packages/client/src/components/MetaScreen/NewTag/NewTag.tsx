import React from "react";
import { useFormikContext } from "formik";

import {
  SmallButton,
  Characters,
  InputBox,
  FormLine,
  MetaDataInput,
  ErrorMessage,
} from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = {
  setNewTag: Function;
  newTag: string;
  push: Function;
  availableTags: string[];
  setIsNewTagError: Function;
  isNewTagError: boolean;
};

export const NewTag = ({
  setNewTag,
  newTag,
  push,
  availableTags,
  setIsNewTagError,
  isNewTagError,
}: Params) => {
  const {
    values: { tags },
  } = useFormikContext<MetaDataInput>();

  const setNewTagValue = (value: string) => {
    if (tags && tags.includes(value)) {
      setIsNewTagError(true);
    } else {
      setIsNewTagError(false);
    }
    setNewTag(value);
  };

  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name="newValue"
          value={newTag}
          onChange={(e) => {
            setNewTagValue(e.target.value);
          }}
          autoComplete="off"
        />
        <SmallButton
          onClick={() => {
            push(newTag);
            setNewTag("");
          }}
        >
          {Characters.plus}
        </SmallButton>
      </FormLine>
      <Selections
        currentValue={newTag}
        selections={availableTags}
        setNewValue={setNewTagValue}
      />
      {isNewTagError && <ErrorMessage>No duplicates</ErrorMessage>}
    </>
  );
};
