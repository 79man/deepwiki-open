/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

export type PromptLogEntry = {
  prompt: string;
  response: string;
  source: string;
  timestamp: number;
  model?: string;      // Model name/ID
  timeTaken?: number;  // in seconds or ms
};

type PromptLogContextType = {
  promptLog: PromptLogEntry[];
  addPromptLog: (entry: PromptLogEntry) => void;
};

const PromptLogContext = createContext<PromptLogContextType | undefined>(
  undefined
);

export const PromptLogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [promptLog, setPromptLog] = useState<PromptLogEntry[]>([]);

  const addPromptLog = (entry: PromptLogEntry) => {
    setPromptLog((log) => [...log, entry]);
  };

  return (
    <PromptLogContext.Provider value={{ promptLog, addPromptLog }}>
      {children}
    </PromptLogContext.Provider>
  );
};

export const usePromptLog = () => {
  const context = useContext(PromptLogContext);
  if (!context)
    throw new Error("usePromptLog must be used within a PromptLogProvider");
  return context;
};
