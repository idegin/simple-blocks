import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { LoaderCircle } from "lucide-react";

import {
  PageBlockData, PageBlockDataRef,
  PageData,
  ProjectData,
  ProjectTheme,
} from "@/types/builder.types";

export interface BuilderState {
  pages: PageData[];
  project: ProjectData | null;
  blocks: PageBlockData[];
  blockRefs: PageBlockDataRef[],
  theme: ProjectTheme | null;
}

const initialState: BuilderState = {
  pages: [],
  project: null,
  blocks: [],
  blockRefs: [],
  theme: null,
};

const BuilderContext = createContext<{
  state: BuilderState;
  setState: React.Dispatch<React.SetStateAction<BuilderState>>;
}>({
  state: initialState,
  setState: () => {},
});

interface BuilderProviderProps {
  values?: Partial<BuilderState>;
  children: ReactNode;
}

export const BuilderProvider = ({ values, children }: BuilderProviderProps) => {
  const [state, setState] = useState<BuilderState>(initialState);

  useEffect(() => {
    if (values) {
      setState((prevState) => ({
        ...prevState,
        ...values,
      }));
    }
  }, [values]);

  return (
    <BuilderContext.Provider value={{ state, setState }}>
      {!state.project ? (
        <div className={"flex justify-center items-center h-screen"}>
          <LoaderCircle className={"text-primary"} />
        </div>
      ) : (
        children
      )}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  return useContext(BuilderContext);
};
