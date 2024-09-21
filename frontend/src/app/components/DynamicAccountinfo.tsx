import {useAccount} from "wagmi";

export default function AccountInfo() {
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