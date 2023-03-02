import React, { createContext, useState } from "react";

type SelectedItemsContextType = {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
};

export const SelectedItemsContext = createContext<SelectedItemsContextType>({
  selectedItems: [],
  setSelectedItems: () => {},
});

export const SelectedItemsProvider: React.FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const contextValue: SelectedItemsContextType = {
    selectedItems,
    setSelectedItems,
  };

  return (
    <SelectedItemsContext.Provider value={contextValue}>
      {children}
    </SelectedItemsContext.Provider>
  );
};
