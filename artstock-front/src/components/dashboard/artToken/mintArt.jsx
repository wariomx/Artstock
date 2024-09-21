import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import uploadFilePinata from "../../../../utils/pin";

export default function MintArtToken() {
  const { writeContract } = useWriteContract();

  const [isOpen, setIsOpen] = useState(false); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [price, setPrice] = useState("");
  const [nftOwner, setNftOwner] = useState("");
  const [tokenId, setTokenId] = useState("");

  const handleInputName = (event) => {
    setName(event.target.value);
  };

  const handleInputDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleInputImage = (event) => {
    const file = event.target.files[0]; 
    setImage(file); 
  };

  const handleIPFS = async () => {
    let res = await uploadFilePinata(image);
    setIpfsImage(res)
    console.log(res)
  };

  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleInputNftOwner = (event) => {
    setNftOwner(event.target.value);
  };

  const handleInputTokenId = (event) => {
    setTokenId(event.target.value);
  };

  const handleMintToken = async () => {
    try {
      const result = await writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "mintArt",
        args: [name, description, ipfsImage, price, nftOwner, tokenId],
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
        className="bg-green-500 hover:bg-green-50 text-black"
      >
        Open Mint Modal
      </Button>

      {/* Modal manual */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <p>Name: </p>
                <Input onChange={handleInputName} value={name} />
              </div>
              <div className="flex">
                <p>Description: </p>
                <Input onChange={handleInputDescription} value={description} />
              </div>
              <div className="flex">
                <p>Image:</p>
                <Input type="file" onChange={handleInputImage} />
                <Button
                  className="bg-green-200 text-black hover:bg-green-50"
                  onClick={handleIPFS}
                >
                  Upload to IPFS
                </Button>
              </div>

              <div className="flex">
                <p>Price:</p>
                <Input onChange={handleInputPrice} value={price} />
              </div>
              <div className="flex">
                <p>Destination Address</p>
                <Input onChange={handleInputNftOwner} value={nftOwner} />
              </div>
              <div className="flex">
                <p>Token Id:</p>
                <Input onChange={handleInputTokenId} value={tokenId} />
              </div>

              {/* Botones dentro del modal */}
              <div className="flex justify-between">
                <Button
                  className="bg-green-200 text-black hover:bg-green-50"
                  onClick={handleMintToken}
                >
                  Mint Token
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
