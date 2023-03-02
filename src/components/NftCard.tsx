import { useState, FC } from "react";

interface NftCardProps {
  imageUrl: string;
  imageName: string;
  mintAddress: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const NftCard: FC<NftCardProps> = ({
  imageUrl,
  mintAddress,
  imageName,
  onClick,
  isSelected,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
      <div className="relative aspect-w-16 aspect-h-9">
        {!isImageLoaded && (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        )}
        <img
          key={mintAddress}
          src={imageUrl}
          alt="Card Image"
          className={`w-full h-full object-cover transition-opacity ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          } ${isSelected ? "border-4 border-blue-500" : ""}}`}
          onLoad={handleImageLoad}
          onClick={onClick}
        />
      </div>
      <div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{imageName}</div>
        </div>
      </div>
    </div>
  );
};
