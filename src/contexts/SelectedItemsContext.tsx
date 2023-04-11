import React, { createContext, useState } from "react";

type SelectedItemsContextType = {
  selectedItems: string[];
  setSelectedItems: (items: object[]) => void;
  fetchedUrl: string;
  setFetchedUrl: (url: string) => void;
};

export const SelectedItemsContext = createContext<SelectedItemsContextType>({
  selectedItems: [],
  setSelectedItems: () => {},
  fetchedUrl: "",
  setFetchedUrl: () => {},
});

export const SelectedItemsProvider: React.FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [fetchedUrl, setFetchedUrl] = useState<string>("");

  const contextValue: SelectedItemsContextType = {
    selectedItems,
    setSelectedItems,
    fetchedUrl: "",
    setFetchedUrl,
  };

  return (
    <SelectedItemsContext.Provider value={contextValue}>
      {children}
    </SelectedItemsContext.Provider>
  );
};
