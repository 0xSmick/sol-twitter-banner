import { createContext } from "react";

interface SelectedNftsContextType {
  numSelectedNfts: number;
  setNumSelectedNfts: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectedNftsContext = createContext<SelectedNftsContextType>({
  numSelectedNfts: 0,
  setNumSelectedNfts: () => {},
});
