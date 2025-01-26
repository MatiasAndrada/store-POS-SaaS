/* "use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type CurrentProjectStore,
  createCurrentProjectStore,
} from "@/store/currentProject";

export const CurrentProjectStoreContext =
  createContext<StoreApi<CurrentProjectStore> | null>(null);

export interface CurrentProjectStoreProviderProps {
  children: ReactNode;
}

export const CurrentProjectStoreProvider = ({
  children,
}: CurrentProjectStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CurrentProjectStore>>();
  if (!storeRef.current) {
    storeRef.current = createCurrentProjectStore();
  }

  return (
    <CurrentProjectStoreContext.Provider value={storeRef.current}>
      {children}
    </CurrentProjectStoreContext.Provider>
  );
};

export const useCurrentProjectStore = <T,>(
  selector: (store: CurrentProjectStore) => T
): T => {
  const currentProjectStoreContext = useContext(CurrentProjectStoreContext);

  if (!currentProjectStoreContext) {
    throw new Error(
      `useCurrentProjectStore must be use within CurrentProjectStoreProvider`
    );
  }

  return useStore(currentProjectStoreContext, selector);
};
 */
