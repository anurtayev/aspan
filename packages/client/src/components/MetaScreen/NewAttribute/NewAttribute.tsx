import React from "react";

import { Characters, SmallButton, InputBox, FormLine } from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = {
  push: Function;
  setNewValue: Function;
  setNewKey: Function;
  newValue: string;
  newKey: string;
  attributes: string[];
};

export const NewAttribute = ({
  push,
  newKey,
  newValue,
  setNewValue,
  setNewKey,
  attributes,
}: Params) => {
  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name="newKey"
          value={newKey}
          onChange={(e) => {
            setNewKey(e.target.value);
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
        selections={attributes}
        setNewValue={setNewKey}
      />
    </>
  );
};
