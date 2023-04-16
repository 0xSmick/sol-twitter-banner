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

type Item = {
  image: string;
};

export const NftGallery: FC<NftGalleryProps> = ({ nftList }) => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);

  const handleImageClick = (item: Item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.image === item.image
    );
    setSelectedItems(
      isSelected
        ? selectedItems.filter((i) => i.image !== item.image)
        : [...selectedItems, item]
    );
  };

  useEffect(() => {
    const fetchedItemList = [];
    const fetchMetadata = async () => {
      for (const item of nftList) {
        try {
          const metadataFetch = await fetch(item.uri);
          const metadataResponse = await metadataFetch.json();
          if (metadataResponse.image.height === metadataResponse.image.width) {
            const nft: NftResponse = {
              image: metadataResponse.image,
              name: metadataResponse.name,
              mintAddress: item.mintAddress,
            };
            fetchedItemList.push(nft);
            console.log("fetched");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      console.log("completed fetching images");

      setFetchedItems(fetchedItemList);
    };
    fetchMetadata();
  }, [nftList]);

  return (
    <section className="overflow-hidden text-neutral-700 p-4 mt-2">
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-4">
          {fetchedItems.map((item) => (
            <div className="flex w-1/5 flex-wrap" key={item.mintAddress}>
              <div className="w-full p-1 md:p-2">
                <NftCard
                  imageUrl={item.image}
                  mintAddress={item.mintAddress}
                  imageName={item.name}
                  onClick={() => handleImageClick(item)}
                  isSelected={selectedItems.includes(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
