import React, { createContext, useContext, useState, ReactNode } from "react";
import { PageBlockDataRef } from "@/types/builder.types";

interface PreviewState {
  activeBlockRef: PageBlockDataRef | null;
}

const initialState: PreviewState = {
  activeBlockRef: null,
};

const PreviewContext = createContext<{
  state: PreviewState;
  setState: React.Dispatch<React.SetStateAction<PreviewState>>;
}>({
  state: initialState,
  setState: () => {},
});

interface PreviewProviderProps {
  children: ReactNode;
}

export const PreviewProvider = ({ children }: PreviewProviderProps) => {
  const [state, setState] = useState<PreviewState>(initialState);

  console.log('PREVIEW STATE:::', state)
  return (
    <PreviewContext.Provider value={{ state, setState }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreviewContext = () => {
  return useContext(PreviewContext);
};