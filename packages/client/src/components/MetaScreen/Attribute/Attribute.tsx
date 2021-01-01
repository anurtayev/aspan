import { useField } from "formik";

import { Characters, SmallButton, InputBox, FormLine } from "common";
import { Selections } from "components/MetaScreen/Selections";

type Params = {
  name: string;
  index: number;
  remove: Function;
  attributes: string[];
};

export const Attribute = ({ name, index, remove, attributes }: Params) => {
  const [field, meta, helpers] = useField<string[]>(name);

  return (
    <>
      <FormLine>
        <InputBox
          type="text"
          name={field.name + ".key"}
          value={field.value[0]}
          onChange={(e) => {
            helpers.setValue([e.target.value, field.value[1]]);
          }}
          autoComplete="off"
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
          {Characters.multiply}
        </SmallButton>
      </FormLine>
      <Selections
        currentValue={field.value[0]}
        selections={attributes}
        setNewValue={(value: string) => {
          helpers.setValue([value, field.value[1]]);
        }}
      />
    </>
  );
};
