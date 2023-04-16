// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { GetNFTs } from "../../components/GetNFTs";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-6xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Shill My Banner
          <span className="text-sm font-normal align-top text-slate-700"></span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>
            Connect your wallet, select your 12 favorite NFTs, and create your
            own twitter banner
          </p>
        </h4>
        <div className="text-center p-4 flex-col align-items ">
          <GetNFTs />
        </div>
      </div>
    </div>
  );
};
