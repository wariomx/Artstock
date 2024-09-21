"use client";

import {
    DynamicContextProvider,
    DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
    createConfig,
    WagmiProvider,
    useAccount,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

const config = createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: false,
    transports: {
        [mainnet.id]: http(),
    },
});

// Setting up list of evmNetworks
const evmNetworks = [
    {
        blockExplorerUrls: ['https://explorer.rootstock.io/'],
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

        rpcUrls: ['https:­//p­ubl­ic-­nod­e.t­est­net.rsk.co'],
        vanityName: 'rBTC Testnet',
    }
];

const queryClient = new QueryClient();

export default function App() {
    return (
        <DynamicContextProvider
            settings={{
                environmentId: '7c8815fc-3790-4b2e-a05c-1677116efe9f', // TODO remove
                walletConnectors: [EthereumWalletConnectors],
                overrides: { evmNetworks },
            }}
        >
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <DynamicWagmiConnector>
                        <DynamicWidget />
                        <AccountInfo />
                    </DynamicWagmiConnector>
                </QueryClientProvider>
            </WagmiProvider>
        </DynamicContextProvider>
    );
}

function AccountInfo() {
    const { address, isConnected, chain } = useAccount();

    return (
        <div>
            <p>
                wagmi connected: {isConnected ? 'true' : 'false'}
            </p>
            <p>wagmi address: {address}</p>
            <p>wagmi network: {chain?.id}</p>
        </div>
    );
};
