import { useField } from "formik";

// import { Button } from "./Attribute.styles";

type Params = { name: string; index: number; remove: Function };

export const Attribute = ({ name, index, remove }: Params) => {
  const [field, meta, helpers] = useField<string[]>(name);
  return (
    <div>
      <input
        type="text"
        name={field.name + ".key"}
        value={meta.value[0]}
        onChange={(e) => {
          helpers.setValue([e.target.value, field.value[1]]);
        }}
      />
      <input
        type="text"
        name={field.name + ".value"}
        value={meta.value[1]}
        onChange={(e) => {
          helpers.setValue([field.value[0], e.target.value]);
        }}
      />
      <button onClick={() => remove(index)}>&#x232b;</button>
    </div>
  );
};
