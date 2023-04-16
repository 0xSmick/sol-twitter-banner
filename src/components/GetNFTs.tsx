import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useContext, useEffect } from "react";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { NftGallery } from "./NftGallery";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";
import BannerModal from "./BannerModal";

export const GetNFTs: FC = () => {
  const { setSelectedItems, selectedItems } = useContext(SelectedItemsContext);
  const { fetchedUrl } = useContext(SelectedItemsContext);
  const { sentResponse } = useContext(SelectedItemsContext);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nftList, setNftList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const perPage = 5;
  const [modalOpen, setModalOpen] = useState(false);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log("error", "Wallet not connected!");
      notify({
        type: "error",
        message: "error",
        description: "Wallet not connected!",
      });
      return;
    }

    try {
      const mx = Metaplex.make(connection);
      const list = await mx
        .nfts()
        .findAllByOwner({ owner: new PublicKey(publicKey.toBase58()) });
      setNftList(list);
      setNftCount(list.length);

      console.log("list", list);
    } catch (error: any) {
      notify({
        type: "error",
        message: `fetching NFTs failed`,
        description: error?.message,
      });
      console.log("error", `Fetching NFTs failed! ${error?.message}`);
    }
  }, [publicKey, connection, setNftList]);

  const handleModalClose = () => {
    setModalOpen(false);
    console.log("modal closed");
  };

  return (
    <div className="">
      {sentResponse && <BannerModal imageUrl={fetchedUrl} />}
      <button
        className="px-4 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#9945FF] hover:from-[#14F195] hover:to-[#14F195] hover:bg-gradient-to-r text-white rounded-md py-2"
        onClick={onClick}
      >
        <span>Fetch NFTs</span>
      </button>
      {nftList && (
        <div>
          <p>Fetching {nftCount} NFTs</p>
        </div>
      )}
      {nftList && (
        <div>
          <NftGallery nftList={nftList} />
        </div>
      )}
    </div>
  );
};
