import React from "react";
import { useFormikContext } from "formik";

import {
  Characters,
  SmallButton,
  InputBox,
  FormLine,
  MetaDataInput,
  ErrorMessage,
} from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = {
  push: Function;
  setNewValue: Function;
  setNewKey: Function;
  newValue: string;
  newKey: string;
  availableAttributesKeys: string[];
  isNewKeyError: boolean;
  setIsNewKeyError: Function;
};

export const NewAttribute = ({
  push,
  newKey,
  newValue,
  setNewValue,
  setNewKey,
  availableAttributesKeys,
  isNewKeyError,
  setIsNewKeyError,
}: Params) => {
  const {
    values: { attributes },
  } = useFormikContext<MetaDataInput>();

  const attributesKeys = attributes
    ? attributes.reduce((acc, current) => {
        acc.push(current[0]);
        return acc;
      }, [])
    : [];

  const setNewKeyValue = (value: string) => {
    if (attributesKeys.includes(value)) {
      setIsNewKeyError(true);
    } else {
      setIsNewKeyError(false);
    }
    setNewKey(value);
  };

  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name="newKey"
          value={newKey}
          onChange={(e) => {
            setNewKeyValue(e.target.value);
          }}
          autoComplete="off"
        />
        <InputBox
          type="text"
          name="newValue"
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
        />
        <SmallButton
          onClick={() => {
            push([newKey, newValue]);
            setNewKey("");
            setNewValue("");
          }}
        >
          {Characters.plus}
        </SmallButton>
      </FormLine>
      <Selections
        currentValue={newKey}
        selections={availableAttributesKeys}
        setNewValue={setNewKeyValue}
      />
      {isNewKeyError && <ErrorMessage>No duplicates</ErrorMessage>}
    </>
  );
};
