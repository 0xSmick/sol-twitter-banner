import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { NftGallery } from "./NftGallery";

export const GetNFTs: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nftList, setNftList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const perPage = 5;

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

  return (
    <div className="">
      <button
        className="px-4 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
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
