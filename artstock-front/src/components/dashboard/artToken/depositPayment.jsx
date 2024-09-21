import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PhysicalDeposit() {
  const { writeContract } = useWriteContract();
  const [tokenId, setTokenId] = useState(0);
  const [isOpen, setIsOpen] = useState(false); 

  const handleInputTokenId = (event) => {
    setTokenId(event.target.value);
  };

  const handleDepositPayment = async () => {
    try {
      const result = await writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "depositPayment",
        args: [tokenId],
      });
      console.log(result);
      setIsOpen(false); // Close the modal after successful deposit
    } catch (error) {
      console.error("Error during physical deposit:", error);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-50 text-black m-2"
      >
        Open Deposit Payment Modal
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <button 
              className="absolute top-2 right-2 text-white" 
              onClick={() => setIsOpen(false)}
            >
              &times; {/* Close button */}
            </button>
            <div className="flex mb-4">
              <p className="mr-2">Token Id:</p>
              <Input 
                onChange={handleInputTokenId} 
                value={tokenId} 
                type="number" // Optional: Set input type to number
              />
            </div>
            <Button
              className="bg-green-200 text-black hover:bg-green-50"
              onClick={handleDepositPayment}
            >
             Deposit Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
