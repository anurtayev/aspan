import React, { useState } from "react";

import { Frame } from "./NewAttribute.styles";

type Params = { push: Function };

export const NewAttribute = ({ push }: Params) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  return (
    <Frame>
      <input
        type="text"
        name="newKey"
        value={newKey}
        onChange={(e) => {
          setNewKey(e.target.value);
        }}
      />
      <input
        type="text"
        name="newValue"
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          push([newKey, newValue]);
          setNewKey("");
          setNewValue("");
        }}
      >
        &#x2713;
      </button>
    </Frame>
  );
};
