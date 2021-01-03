import { useState } from "react";
import { useField } from "formik";

import { Characters, SmallButton, FormLine, InputBox } from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = { name: string; index: number; remove: Function; tags: string[] };

export const Tag = ({ remove, name, index, tags }: Params) => {
  const [isFocused, setIsFocused] = useState<boolean>();
  // eslint-disable-next-line
  const [field, meta, helpers] = useField<string>(name);

  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name={field.name}
          value={field.value}
          onChange={(e) => {
            helpers.setValue(e.target.value);
          }}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <SmallButton onClick={() => remove(index)}>
          {Characters.multiply}
        </SmallButton>
      </FormLine>
      {isFocused && (
        <Selections
          currentValue={field.value}
          selections={tags}
          setNewValue={helpers.setValue}
        />
      )}
    </>
  );
};
