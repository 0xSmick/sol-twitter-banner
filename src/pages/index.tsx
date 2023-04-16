import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Shill Your Banner</title>
        <meta
          name="description"
          content="Shill Your Banner is a tool to create a custom twitter banner using your favorite NFTs"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
