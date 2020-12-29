import React, { useState } from "react";

import { Characters, SmallButton, InputBox, FormLine } from "common";

type Params = { push: Function };

export const NewAttribute = ({ push }: Params) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

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
        {Characters.check}
      </SmallButton>
    </FormLine>
  );
};
