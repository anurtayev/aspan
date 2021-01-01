import React from "react";

import { SmallButton, Characters, InputBox, FormLine } from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = {
  setNewTag: Function;
  newTag: string;
  push: Function;
  tags: string[];
};

export const NewTag = ({ setNewTag, newTag, push, tags }: Params) => {
  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name="newValue"
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
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
        selections={tags}
        setNewValue={setNewTag}
      />
    </>
  );
};
