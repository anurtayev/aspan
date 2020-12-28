import React, { useState } from "react";

import { Frame } from "./NewTag.styles";

type Params = { push: Function };

export const NewTag = ({ push }: Params) => {
  const [newTag, setNewTag] = useState("");

  return (
    <Frame>
      <input
        type="text"
        name="newValue"
        value={newTag}
        onChange={(e) => {
          setNewTag(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          push(newTag);
          setNewTag("");
        }}
      >
        &#x2713;
      </button>
    </Frame>
  );
};
