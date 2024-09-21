import MaxWidthWrapper from "@/components/MaxWidhWrapper";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { createConfig, WagmiProvider } from "wagmi";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { mainnet } from "viem/chains";
import { http } from "viem";
import MintArtToken from "./mintArt"
import PhysicalDeposit from "./physicalDeposit";
import CurateArt from "./curate"
import CreateEscrow from "./createEscrow"
import DepositPayment from "./depositPayment";
import CompleteEscrow from "./completeEscrow";

const queryClient = new QueryClient();

const configWagmi = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

// Setting up list of evmNetworks
const evmNetworks = [
  {
    blockExplorerUrls: ["https://explorer.testnet.rootstock.io/"],
    chainId: 31,
    chainName: "Rootstock Testnet",
    iconUrls: [
      "https://pbs.twimg.com/profile_images/1592915327343624195/HPPSuVx3_400x400.jpg",
    ],
    name: "Rootstock",
    nativeCurrency: {
      decimals: 18,
      name: "tRBTC",
      symbol: "tRBTC",
    },
    networkId: 8100,
    rpcUrls: ["https://public-node.testnet.rsk.co"],
    vanityName: "rBTC Testnet",
  },
];

export default function ArtTokenization() {
  const [address, setAddress] = useState();

  const handleInput = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  return (
    <MaxWidthWrapper>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks },
        }}
      >
        <WagmiProvider config={configWagmi}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to Artstock</h1>
                <p className="text-xl mb-8">
                  Tokenize and sell your artworks on our marketplace
                </p>
                <div className="mb-8"></div>
                <img src="/tokenization.png" className="w-1/2" />
               
                <p> Create and Mint Art Token Here</p>
                <DynamicWidget />
                <Input onChange={handleInput} value={address} />
                <MintArtToken/>
                <PhysicalDeposit/>
                <CurateArt/>
                <CreateEscrow/>
                <DepositPayment/>
                <CompleteEscrow/>
              </div>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </MaxWidthWrapper>
  );
}
