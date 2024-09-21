import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function MintArtToken() {
  const { writeContract } = useWriteContract();
  const [isOpen, setIsOpen] = useState(false);
  const [buyer, setBuyer] = useState(""); //address
  const [tokenId, setTokenId] = useState(0); //uint256
  const [price, setPrice] = useState(0); //uint256
  const [curator, setCurator] = useState(""); //address
  const [guardian, setGuardian] = useState(""); //address

  const handleInputBuyer = (event) => {
    setBuyer(event.target.value);
  };

  const handleInputTokenId = (event) => {
    setTokenId(event.target.value);
  };

  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSetCurator = (event) => {
    setCurator(event.target.value);
  };

  const handleSetGuardian = (event) => {
    setGuardian(event.target.value);
  };

  const handleCreateEscrow = async () => {
    try {
      const result = await writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "createEscrow",
        args: [buyer, tokenId, price, curator, guardian],
      });
      console.log(result);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-50 text-black m-2"
      >
        Open Create Escrow Modal
      </Button>

      {/* Modal manual */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <p>Buyer: </p>
                <Input onChange={handleInputBuyer} value={buyer} />
              </div>
              <div className="flex">
                <p>Token Id: </p>
                <Input onChange={handleInputTokenId} value={tokenId} />
              </div>

              <div className="flex">
                <p>Price:</p>
                <Input onChange={handleInputPrice} value={price} />
              </div>
              <div className="flex">
                <p>Curator:</p>
                <Input onChange={handleSetCurator} value={curator} />
              </div>
              <div className="flex">
                <p>Guardian:</p>
                <Input onChange={handleSetGuardian} value={guardian} />
              </div>

              <div className="flex justify-between">
                <Button
                  className="bg-green-200 text-black hover:bg-green-50"
                  onClick={handleCreateEscrow}
                >
                  Create Escrow
                </Button>
                <Button
                  className="bg-red-200 text-black hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
