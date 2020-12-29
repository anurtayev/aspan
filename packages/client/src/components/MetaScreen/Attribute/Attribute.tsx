import { useField } from "formik";

import { Characters, SmallButton, InputBox, FormLine } from "common";

type Params = { name: string; index: number; remove: Function };

export const Attribute = ({ name, index, remove }: Params) => {
  const [field, meta, helpers] = useField<string[]>(name);

  return (
    <FormLine>
      <InputBox
        type="text"
        name={field.name + ".key"}
        value={meta.value[0]}
        onChange={(e) => {
          helpers.setValue([e.target.value, field.value[1]]);
        }}
      />
      <InputBox
        type="text"
        name={field.name + ".value"}
        value={meta.value[1]}
        onChange={(e) => {
          helpers.setValue([field.value[0], e.target.value]);
        }}
      />
      <SmallButton onClick={() => remove(index)}>
        {Characters.delete}
      </SmallButton>
    </FormLine>
  );
};
