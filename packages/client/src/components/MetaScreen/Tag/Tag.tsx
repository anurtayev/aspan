import React from "react";
import { useField } from "formik";

import { Characters, SmallButton, FormLine, InputBox } from "common";

type Params = { name: string; index: number; remove: Function };

export const Tag = ({ remove, name, index }: Params) => {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <FormLine>
      <InputBox
        type="text"
        name={field.name}
        value={meta.value}
        onChange={(e) => {
          helpers.setValue(e.target.value);
        }}
      />
      <SmallButton onClick={() => remove(index)}>
        {Characters.multiply}
      </SmallButton>
    </FormLine>
  );
};
