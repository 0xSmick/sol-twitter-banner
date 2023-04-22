import React, { useState, useEffect, useContext } from "react";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";
import { InfinitySpin } from "react-loader-spinner"; // Import the react-loader-spinner library
import { notify } from "../utils/notifications";
import { FaTimes } from "react-icons/fa";

const BannerModal = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSentResponse } = useContext(SelectedItemsContext);

  const handleClose = () => {
    setSentResponse(false);
    console.log("closing modal");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(imageUrl)
      .then(() =>
        notify({
          type: "success",
          message: "Copied to clipboard!",
          description: "You can now paste it anywhere",
        })
      )
      .catch((err) => console.error("Could not copy content: ", err));
  };

  useEffect(() => {
    // Fetch the image using the provided imageUrl
    if (!imageUrl) return;
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          setLoading(false);
        } else {
          setError("Failed to fetch image");
        }
      } catch (error) {
        setError("Failed to fetch image");
      }
    };

    fetchImage();
  }, [imageUrl]);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 max-w-4xl rounded-lg overflow-hidden">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-white text-2xl font-bold p-2 m-2"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal content */}
        {loading ? (
          // Show loading spinner while image is loading
          <div className="flex items-center justify-center h-64">
            <h1>Creating Your Banner - This may take 30-45 seconds</h1>
            <InfinitySpin width="200" color="teal" />
          </div>
        ) : error ? (
          // Show error message if image fetch fails
          <div className="flex items-center justify-center h-64 text-white">
            {error}
          </div>
        ) : (
          <div>
            <h1 className="text-white text-center mb-6">
              Go shill your banner on Twitter (be sure and copy / save it)
            </h1>
            <div>
              <img
                src={imageUrl}
                alt="Twitter Banner"
                className="w-full h-full object-cover"
              />
              <div className="flex justify-center">
                <a
                  href={imageUrl}
                  download="twitter-banner.jpg"
                  target="_blank"
                  className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md self-center m-4"
                >
                  Download
                </a>
                <button
                  onClick={handleCopy}
                  className="mt-4 px-3 py-2 bg-teal-500 text-white rounded-md self-center m-4"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerModal;
