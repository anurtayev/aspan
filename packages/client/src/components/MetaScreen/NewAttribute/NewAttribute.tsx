import React from "react";

import { Characters, SmallButton, InputBox, FormLine } from "common";

type Params = {
  push: Function;
  setNewValue: Function;
  setNewKey: Function;
  newValue: string;
  newKey: string;
};

export const NewAttribute = ({
  push,
  newKey,
  newValue,
  setNewValue,
  setNewKey,
}: Params) => {
  return (
    <FormLine>
      <InputBox
        type="text"
        name="newKey"
        value={newKey}
        onChange={(e) => {
          setNewKey(e.target.value);
        }}
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
  );
};
