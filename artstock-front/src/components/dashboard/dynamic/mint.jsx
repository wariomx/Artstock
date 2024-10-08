import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";

export const DynamicMint = () => {
  const { writeContract } = useWriteContract();

  const mintToken = async () => {
    try {
      const result = writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "mintArt",
        args: [
          "NameTest", // _name
          "DescriptionTest", // _description
          "ImageTest", // _image
          100, // _price
          "0xa2972322047F044B5889A3180D082111632E528F", // to
          1005, // tokenId
        ],
      });
      console.log(result);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  return <Button onClick={mintToken}>Mint NFT of your artwork</Button>;
};
