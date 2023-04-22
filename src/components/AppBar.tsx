import { FC, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";

export const AppBar: FC = (props) => {
  const { publicKey } = useWallet();
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);
  const { fetchedUrl, setFetchedUrl } = useContext(SelectedItemsContext);
  const { sentResponse, setSentResponse } = useContext(SelectedItemsContext);

  const handleMint = async () => {
    console.log({ selectedItems });
    console.log("Minting");
    console.log({
      wallet: publicKey.toBase58(),
      items: selectedItems.map((item) => item.image),
    });
    try {
      setSentResponse(true);
      console.log(fetchedUrl);
      const response = await fetch(
        "https://xytl3lxjk2.execute-api.us-east-1.amazonaws.com/dev/banner",
        {
          method: "POST",
          body: JSON.stringify({
            wallet: publicKey.toBase58(),
            items: selectedItems.map((item) => item.image),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setFetchedUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex flex-row md:mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start">
          <div className="hidden sm:inline w-22 h-22 md:p-2">
            <svg
              width="100%"
              height="22"
              viewBox="0 0 646 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1064_606)">
                <path
                  d="M108.53 75.6899L90.81 94.6899C90.4267 95.1026 89.9626 95.432 89.4464 95.6573C88.9303 95.8827 88.3732 95.9994 87.81 95.9999H3.81C3.40937 95.9997 3.01749 95.8827 2.68235 95.6631C2.34722 95.4436 2.08338 95.1311 1.92313 94.7639C1.76288 94.3967 1.71318 93.9908 1.78012 93.5958C1.84706 93.2008 2.02772 92.8338 2.3 92.5399L20 73.5399C20.3833 73.1273 20.8474 72.7979 21.3636 72.5725C21.8797 72.3472 22.4368 72.2305 23 72.2299H107C107.404 72.2216 107.802 72.333 108.143 72.5502C108.484 72.7674 108.754 73.0806 108.917 73.4504C109.081 73.8203 109.131 74.2303 109.062 74.6288C108.993 75.0273 108.808 75.3965 108.53 75.6899ZM90.81 37.4199C90.4253 37.0091 89.9608 36.6811 89.445 36.4558C88.9292 36.2306 88.3728 36.1129 87.81 36.11H3.81C3.40937 36.1102 3.01749 36.2272 2.68235 36.4468C2.34722 36.6663 2.08338 36.9788 1.92313 37.346C1.76288 37.7132 1.71318 38.1191 1.78012 38.5141C1.84706 38.9091 2.02772 39.2761 2.3 39.57L20 58.58C20.3847 58.9908 20.8492 59.3188 21.365 59.5441C21.8808 59.7693 22.4372 59.887 23 59.8899H107C107.4 59.8878 107.79 59.7693 108.124 59.5491C108.458 59.3288 108.72 59.0162 108.879 58.6494C109.038 58.2826 109.087 57.8774 109.019 57.4833C108.952 57.0892 108.772 56.7232 108.5 56.43L90.81 37.4199ZM3.81 23.7699H87.81C88.3732 23.7694 88.9303 23.6527 89.4464 23.4273C89.9626 23.202 90.4267 22.8726 90.81 22.4599L108.53 3.45995C108.808 3.16647 108.993 2.79726 109.062 2.39877C109.131 2.00028 109.081 1.59031 108.917 1.22045C108.754 0.850591 108.484 0.537368 108.143 0.320195C107.802 0.103021 107.404 -0.0084012 107 -5.10783e-05H23C22.4368 0.000541762 21.8797 0.117167 21.3636 0.342553C20.8474 0.567938 20.3833 0.897249 20 1.30995L2.3 20.3099C2.02772 20.6038 1.84706 20.9708 1.78012 21.3658C1.71318 21.7608 1.76288 22.1667 1.92313 22.5339C2.08338 22.9011 2.34722 23.2136 2.68235 23.4331C3.01749 23.6527 3.40937 23.7697 3.81 23.7699Z"
                  fill="url(#paint0_linear_1064_606)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1064_606"
                  x1="10.81"
                  y1="98.29"
                  x2="98.89"
                  y2="-1.01005"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.08" stopColor="#9945FF" />
                  <stop offset="0.3" stopColor="#8752F3" />
                  <stop offset="0.5" stopColor="#5497D5" />
                  <stop offset="0.6" stopColor="#43B4CA" />
                  <stop offset="0.72" stopColor="#28E0B9" />
                  <stop offset="0.97" stopColor="#19FB9B" />
                </linearGradient>
                <clipPath id="clip0_1064_606">
                  <rect width="646" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:inline md:navbar-center">
          <div className="flex items-stretch"></div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end">
          <div className="navbar-item">
            {selectedItems.length} NFTs selected
          </div>
          <div className="navbar-item">
            <button
              className="px-4 mr-4 ml-4 btn bg-teal-500 text-white rounded-md self-center hover:from[teal-500] hover:to[teal-600]"
              onClick={handleMint}
              disabled={selectedItems.length !== 12}
            >
              <span>Create Banner</span>
            </button>
          </div>
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
