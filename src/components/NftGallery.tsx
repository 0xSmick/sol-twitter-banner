import { FC, useCallback, useEffect } from "react";
import { NftCard } from "./NftCard";
import { useState } from "react";
import { Nft } from "@metaplex-foundation/js";

interface NftGalleryProps {
  nftList: any[];
}

export const NftGallery: FC<NftGalleryProps> = ({ nftList }) => {
  const [images, setImages] = useState([]);
  const [selectedImageIds, setSelectedImageids] = useState([]);

  useEffect(() => {
    const imageList = [];
    const fetchImages = async () => {
      for (const item of nftList) {
        try {
          const metadataFetch = await fetch(item.uri);
          const metadataResponse = await metadataFetch.json();
          imageList.push(metadataResponse.image);
          console.log("fetched");
        } catch (error) {
          console.log("error", error);
        }
      }
      console.log("completed fetching images");
      console.log(imageList);
      setImages(imageList);
    };
    fetchImages();
  }, []);

  return (
    <section className="overflow-hidden text-neutral-700 p-4 mt-2">
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
          {images.map((imageUrl) => (
            <div className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <NftCard imageUrl={imageUrl} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
