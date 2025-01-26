"use client";
import React, { createContext, useContext } from "react";

interface EnvContextProps {
  nodeEnv: string;
}

const EnvContext = createContext<EnvContextProps | undefined>(undefined);

export const EnvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV || "development";

  return (
    <EnvContext.Provider value={{ nodeEnv }}>{children}</EnvContext.Provider>
  );
};

export const useEnv = (): EnvContextProps => {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error("useEnv must be used within an EnvProvider");
  }
  return context;
};
