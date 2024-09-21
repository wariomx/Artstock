"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors, isEthereumWallet } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
  createConfig,
  WagmiProvider,
  useAccount,
  useWaitForTransactionReceipt
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import { FC, FormEventHandler, useState } from "react";
import Dynamic from './components/Dynamic';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});


import { useSimulateContract, useWriteContract } from 'wagmi'

// Setting up list of evmNetworks
const evmNetworks = [
  {
    blockExplorerUrls: ['https://explorer.testnet.rootstock.io/'],
    chainId: 31,
    chainName: 'Rootstock Testnet',
    iconUrls: ['https://pbs.twimg.com/profile_images/1592915327343624195/HPPSuVx3_400x400.jpg'],
    name: 'Rootstock',
    nativeCurrency: {
      decimals: 18,
      name: 'tRBTC',
      symbol: 'tRBTC',
    },
    networkId: 8100,
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    vanityName: 'rBTC Testnet',
  }
];



export const SendTransactionSection: FC = () => {
    const { primaryWallet } = useDynamicContext();

    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const address = formData.get("address") as string;
        const amount = formData.get("amount") as string;

        const publicClient = await primaryWallet.getPublicClient();
        const walletClient = await primaryWallet.getWalletClient();

        const transaction = {
            to: address,
            value: amount ? parseEther(amount) : undefined,
        };

        const hash = await walletClient.sendTransaction(transaction);
        setTxnHash(hash);
    };

    return (
        <form onSubmit={onSubmit}>
            <p>Send to tRBTC address</p>
            <input name="address" type="text" required placeholder="Address" />
            <input name="amount" type="text" required placeholder="0.05" />
            <button type="submit">Send</button>
            <span data-testid="transaction-section-result-hash">{txnHash}</span>
        </form>
    );
};

import { abi } from '../../utils/abi'
export const ContractWriteSection: FC = () => {
    const result = useSimulateContract({
        abi,
        address: '0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667',
        functionName: 'mintArt',
        args: [
            "NameTest", // _name
            "DescriptionTest",// _description
            "ImageTest",// _image
            100, // _price
            "0xa2972322047F044B5889A3180D082111632E528F", // to
            1004 // tokenId
        ],
    })

    const { writeContract } = useWriteContract()

    const mintToken = async () => {
       try {

            const result = await writeContract({
                abi,
                address: '0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667',
                functionName: 'mintArt',
                args: [
                    "NameTest", // _name
                    "DescriptionTest",// _description
                    "ImageTest",// _image
                    100, // _price
                    "0xa2972322047F044B5889A3180D082111632E528F", // to
                    1005 // tokenId
                ],
            })
            console.log(result)
        } catch (error) {
            console.error(error)
           console.log(error)
       }
    }

    return (
        <button
            onClick={mintToken}
        >
            mintToken
        </button>
    )
};


const queryClient = new QueryClient();

export default function Home() {
  return (
      <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [EthereumWalletConnectors],
            overrides: { evmNetworks },
          }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to Artstock</h1>
                <p className="text-xl mb-8">Tokenize and sell your artworks on our marketplace</p>
                <div className="mb-8">
                  <DynamicWidget />
                </div>
                <AccountInfo />
                <SendTransactionSection />
                <ContractWriteSection />
                <Dynamic/>
              </div>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
  );
}

function AccountInfo() {
  const { address, isConnected, chain } = useAccount();

  return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="mb-2">
          Wagmi connected: <span className="font-bold">{isConnected ? 'true' : 'false'}</span>
        </p>
        <p className="mb-2">Wagmi address: <span className="font-mono">{address}</span></p>
        <p>Wagmi network: <span className="font-bold">{chain?.id}</span></p>

      </div>
  );
}