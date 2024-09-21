import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Input } from "@/components/ui/input";


export default function CreateEscrow() {
  const { writeContract } = useWriteContract();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [tokenId, setTokenId] = useState();

  const handleInputName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleInputDescription = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };
  const handleInputImage = (event) => {
    event.preventDefault();
    setImage(event.target.value);
    
  };

 

  const handleInputPrice = (event) => {
    event.preventDefault();
    setPrice(event.target.value);
  };
  const handleInputNftOwner = (event) => {
    event.preventDefault();
    setNftOwner(event.target.value);
  };

  const handleInputTokenId = (event) => {
    event.preventDefault();
    setTokenId(event.target.value);
  };

  const handleMintToken = async () => {
    console.log(address);
    console.log(abi);
    try {
      const result = writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "mintArt",
        args: [name, description, image, price, nftOwner, tokenId],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex">
        <p>Name: </p>
        <Input onChange={handleInputName} value={name} />
      </div>
      <Input onChange={handleInputDescription} value={description} />
      <Input onChange={handleInputImage} value={image} />
      <Input onChange={handleInputPrice} value={price} />
      <Input onChange={handleInputNftOwner} value={nftOwner} />
      <Input onChange={handleInputTokenId} value={tokenId} />

      <Button
        className="m-3 bg-green-200 text-black  hover:bg-green-50"
        onClick={handleMintToken}
      >
        Create Escrow
      </Button>
    </div>
  );
}
