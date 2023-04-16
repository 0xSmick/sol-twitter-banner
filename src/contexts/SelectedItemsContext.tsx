import React, { createContext, useState } from "react";

type Item = {
  image: string;
};

type SelectedItemsContextType = {
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
  fetchedUrl: string;
  setFetchedUrl: (url: string) => void;
  sentResponse: boolean;
  setSentResponse: (response: boolean) => void;
};

export const SelectedItemsContext = createContext<SelectedItemsContextType>({
  selectedItems: [],
  setSelectedItems: () => {},
  fetchedUrl: "",
  setFetchedUrl: () => {},
  sentResponse: false,
  setSentResponse: () => {},
});

export const SelectedItemsProvider: React.FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [fetchedUrl, setFetchedUrl] = useState<string>("");
  const [sentResponse, setSentResponse] = useState<boolean>(false);

  const contextValue: SelectedItemsContextType = {
    selectedItems,
    setSelectedItems,
    fetchedUrl,
    setFetchedUrl,
    sentResponse,
    setSentResponse,
  };

  return (
    <SelectedItemsContext.Provider value={contextValue}>
      {children}
    </SelectedItemsContext.Provider>
  );
};
