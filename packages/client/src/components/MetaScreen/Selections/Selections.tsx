import React from "react";

import { SelectionFrame, PositionedFrame } from "./Selections.styles";

type Params = {
  currentValue: string;
  selections: string[];
  setNewValue: Function;
};

export const Selections = ({
  currentValue,
  selections,
  setNewValue,
}: Params) => {
  const filteredSelections = selections.filter((selection) =>
    selection.includes(currentValue)
  );

  return currentValue &&
    (filteredSelections.length > 1 ||
      (filteredSelections.length === 1 &&
        filteredSelections[0] !== currentValue)) ? (
    <PositionedFrame>
      <SelectionFrame>
        {filteredSelections.map((selection) => (
          <div key={selection} onClick={(e) => setNewValue(selection)}>
            {selection}
          </div>
        ))}
      </SelectionFrame>
    </PositionedFrame>
  ) : null;
};
