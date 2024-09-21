import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CompleteEscrow() {
  const [tokenId, setTokenId] = useState();
  const { writeContract } = useWriteContract();

  const handleInput = (event) => {
    event.preventDefault();
    setTokenId(event.target.value);
  };

  const handleCompleteEscrow = async () => {

    try {
      const result = writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "mintArt",
        args: [tokenId],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input onChange={handleInput} value={tokenId} />
      <Button
        className="m-3 bg-green-200 text-black  hover:bg-green-50"
        onClick={handleCompleteEscrow}
      >
        Complete Escrow
      </Button>
    </div>
  );
}
