import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { MetaDataInput } from "common";

export type Pointer = MetaDataInput & {
  id: string;
  scrollTop: number;
  idSubstring?: string | null;
};

type PointerHistory = Array<Pointer>;

export type AspanContextType = {
  returnPositions: [PointerHistory, Dispatch<SetStateAction<PointerHistory>>];
};

export const AspanContext = createContext<AspanContextType | undefined>(
  undefined
);

export const AspanContextComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const contextValue = {
    returnPositions: useState<PointerHistory>([]),
  };
  return (
    <AspanContext.Provider value={contextValue}>
      {children}
    </AspanContext.Provider>
  );
};
