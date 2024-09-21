import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";

export default function MintArtToken({ address }) {
  const { writeContract } = useWriteContract();

  const handleMintToken = async () => {
    console.log(address);
    console.log(abi);
    try {
      const result = writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "mintArt",
        args: [
          "wario",
          "description",
          "image",
          1,
          "0xFD0Bb0b9F3B236F211033BCa5De04Cc0531B0250",
          88,
        ],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className="m-3 bg-green-200 text-black  hover:bg-green-50"
        onClick={handleMintToken}
      >
        Physical Deposit
      </Button>
    </div>
  );
}
