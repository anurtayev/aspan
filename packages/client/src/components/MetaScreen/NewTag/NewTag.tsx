import React, { useState } from "react";

import { SmallButton, Characters, InputBox, FormLine } from "common";

type Params = { push: Function };

export const NewTag = ({ push }: Params) => {
  const [newTag, setNewTag] = useState("");

  return (
    <FormLine>
      <InputBox
        type="text"
        name="newValue"
        value={newTag}
        onChange={(e) => {
          setNewTag(e.target.value);
        }}
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
  );
};
