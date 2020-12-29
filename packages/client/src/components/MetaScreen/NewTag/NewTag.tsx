import React from "react";

import { SmallButton, Characters, InputBox, FormLine } from "common";

type Params = { setNewTag: Function; newTag: string; push: Function };

export const NewTag = ({ setNewTag, newTag, push }: Params) => {
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
