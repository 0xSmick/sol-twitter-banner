import { FC, useEffect, useContext } from "react";
import { NftCard } from "./NftCard";
import { useState } from "react";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";
import _ from "lodash";

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
  const [fetchItemCount, setFetchedItemCount] = useState(0);
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
    const fetchMetadata = async () => {
      const batchSize = 20; // number of images to fetch at once
      const batches = chunk(nftList, batchSize); // split the list into batches
      const abortController = new AbortController();

      try {
        const fetchedMintAddresses = new Set(); // Set to keep track of mint addresses of fetched items
        const promises = batches.map(async (batch) => {
          const fetchPromises = batch.map(async (item) => {
            const signal = abortController.signal;

            if (fetchedMintAddresses.has(item.mintAddress)) {
              // Check if item has already been fetched
              return null;
            }

            try {
              const metadataFetch = await fetch(item.uri, { signal });
              const metadataResponse = await metadataFetch.json();

              if (
                metadataResponse.image.height !== metadataResponse.image.width
              ) {
                return null;
              }

              const nft: NftResponse = {
                image: metadataResponse.image,
                name: metadataResponse.name,
                mintAddress: item.mintAddress,
              };

              fetchedMintAddresses.add(item.mintAddress); // Add mint address of fetched item to Set

              return nft;
            } catch (error) {
              console.log("error", error);
              return null;
            }
          });

          const fetchedItems = await Promise.all(fetchPromises);
          const filteredItems = fetchedItems.filter((item) => item !== null);

          setFetchedItems((prevItems) =>
            _.uniqBy([...prevItems, ...filteredItems], "mintAddress")
          );
          setFetchedItemCount((count) => count + filteredItems.length);
        });

        await Promise.all(promises);
        console.log("completed fetching images");
      } catch (error) {
        console.log("fetchMetadata aborted:", error);
      }
    };

    // helper function to split an array into batches
    const chunk = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );
    fetchMetadata();
  }, [nftList]);

  return (
    <section className="overflow-hidden text-neutral-700 p-4 mt-2">
      <div>{fetchItemCount} NFTs found</div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-4">
          {fetchedItems.map((item) => (
            <div
              className={`flex ${
                window.innerWidth > 768 ? "w-1/5" : "w-1/4"
              } flex-wrap`}
              key={item.mintAddress}
            >
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
