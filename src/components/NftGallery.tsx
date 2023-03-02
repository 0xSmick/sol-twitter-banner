import { FC, useCallback, useEffect, useContext } from "react";
import { NftCard } from "./NftCard";
import { useState } from "react";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";

interface NftGalleryProps {
  nftList: any[];
}

type NftResponse = {
  image: string;
  name: string;
  mintAddress: string;
};

export const NftGallery: FC<NftGalleryProps> = ({ nftList }) => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);

  const handleImageClick = (index: string) => {
    const isSelected = selectedItems.includes(index);
    setSelectedItems(
      isSelected
        ? selectedItems.filter((i) => i !== index)
        : [...selectedItems, index]
    );
    console.log(selectedItems);
  };

  useEffect(() => {
    const fetchedItemList = [];
    const fetchMetadata = async () => {
      for (const item of nftList) {
        try {
          const metadataFetch = await fetch(item.uri);
          const metadataResponse = await metadataFetch.json();
          const nft: NftResponse = {
            image: metadataResponse.image,
            name: metadataResponse.name,
            mintAddress: item.mintAddress,
          };
          fetchedItemList.push(nft);
          console.log("fetched");
        } catch (error) {
          console.log("error", error);
        }
      }
      console.log("completed fetching images");
      console.log(fetchedItemList);
      setFetchedItems(fetchedItemList);
    };
    fetchMetadata();
  }, []);

  return (
    <section className="overflow-hidden text-neutral-700 p-4 mt-2">
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
          {fetchedItems.map((item) => (
            <div className="flex w-1/3 flex-wrap" key={item.mintAddress}>
              <div className="w-full p-1 md:p-2">
                <NftCard
                  imageUrl={item.image}
                  mintAddress={item.mintAddress}
                  imageName={item.name}
                  onClick={() => handleImageClick(item.mintAddress)}
                  isSelected={selectedItems.includes(item.mintAddress)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
