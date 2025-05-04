'use client';

import type { Editor } from '@tiptap/react';
import React from 'react';

export interface TiptapToolbarContextProps {
  editor: Editor;
}

export const TiptapToolbarContext = React.createContext<TiptapToolbarContextProps | null>(null);

interface TiptapToolbarProviderProps {
  editor: Editor;
  children: React.ReactNode;
}

export const TiptapToolbarProvider = ({ editor, children }: TiptapToolbarProviderProps) => {
  return <TiptapToolbarContext.Provider value={{ editor }}>{children}</TiptapToolbarContext.Provider>;
};

export const useTiptapToolbar = () => {
  const context = React.useContext(TiptapToolbarContext);

  if (!context) {
    throw new Error('useTiptapToolbar must be used within a TiptapToolbarProvider');
  }

  return context;
};
