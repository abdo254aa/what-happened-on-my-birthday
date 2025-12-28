
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  // Font Scales
  headingScale: number;
  setHeadingScale: (val: number) => void;
  bodyScale: number;
  setBodyScale: (val: number) => void;
  lineHeight: number;
  setLineHeight: (val: number) => void;
  
  // Layout
  contentWidth: 'normal' | 'wide';
  setContentWidth: (width: 'normal' | 'wide') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or Defaults
  const [headingScale, setHeadingScale] = useState(() => parseFloat(localStorage.getItem('headingScale') || '1.0'));
  const [bodyScale, setBodyScale] = useState(() => parseFloat(localStorage.getItem('bodyScale') || '1.0'));
  const [lineHeight, setLineHeight] = useState(() => parseFloat(localStorage.getItem('lineHeight') || '1.8'));
  const [contentWidth, setContentWidth] = useState<'normal' | 'wide'>(() => (localStorage.getItem('contentWidth') as any) || 'normal');

  useEffect(() => {
    localStorage.setItem('headingScale', headingScale.toString());
    localStorage.setItem('bodyScale', bodyScale.toString());
    localStorage.setItem('lineHeight', lineHeight.toString());
    localStorage.setItem('contentWidth', contentWidth);
  }, [headingScale, bodyScale, lineHeight, contentWidth]);

  return (
    <SettingsContext.Provider value={{ 
      headingScale, setHeadingScale, 
      bodyScale, setBodyScale, 
      lineHeight, setLineHeight, 
      contentWidth, setContentWidth 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
