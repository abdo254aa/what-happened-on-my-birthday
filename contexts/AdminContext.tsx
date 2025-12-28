
import React, { createContext, useContext, useState } from 'react';

interface GlobalStyles {
  headingColor: string;
  paragraphColor: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

interface AdminContextType {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  globalStyles: GlobalStyles;
  setGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  manualInjection: string;
  setManualInjection: (val: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [manualInjection, setManualInjection] = useState("");
  const [globalStyles, setGlobalStylesInternal] = useState<GlobalStyles>({
    headingColor: "",
    paragraphColor: "",
    textAlign: "left"
  });

  const setGlobalStyles = (styles: Partial<GlobalStyles>) => {
    setGlobalStylesInternal(prev => ({ ...prev, ...styles }));
  };

  return (
    <AdminContext.Provider value={{ 
      editMode, setEditMode, 
      globalStyles, setGlobalStyles,
      manualInjection, setManualInjection 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};
