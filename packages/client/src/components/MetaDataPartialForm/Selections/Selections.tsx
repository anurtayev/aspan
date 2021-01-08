import React from "react";

import { SelectionFrame, PositionedFrame } from "./Selections.styles";

type Params = {
  currentValue: string;
  selections: string[];
  setNewValue: Function;
  isInputFocused: boolean;
  isSelected: boolean;
  setIsSelected: Function;
};

export const Selections = ({
  currentValue,
  selections,
  setNewValue,
  isInputFocused,
  isSelected,
  setIsSelected,
}: Params) => {
  const filteredSelections = selections.filter(
    (selection) =>
      selection.includes(currentValue) && selection !== currentValue
  );

  return (isInputFocused || !isSelected) &&
    currentValue &&
    (filteredSelections.length > 1 ||
      (filteredSelections.length === 1 &&
        filteredSelections[0] !== currentValue)) ? (
    <PositionedFrame>
      <SelectionFrame>
        {filteredSelections.map((selection) => (
          <div
            key={selection}
            onClick={(e) => {
              setNewValue(selection);
              setIsSelected(true);
            }}
          >
            {selection}
          </div>
        ))}
      </SelectionFrame>
    </PositionedFrame>
  ) : null;
};
