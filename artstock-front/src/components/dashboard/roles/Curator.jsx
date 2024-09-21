import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";

export default function Curator() {
  const { writeContract } = useWriteContract();
  const contractSmart = process.env.NEXT_PUBLIC_SMART_CONTRACT 

  const handleCurator = async () => {
    console.log(address);
    console.log(abi);
    try {
      const result = writeContract({
        abi,
        address: contractSmart,
        functionName: "assignCurator",
        args: [address, "wario", "location", "specialization"],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button className="m-3  bg-green-200 text-black  hover:bg-green-50" onClick={handleCurator}>
        Assign Curator Role
      </Button>
    </div>
  );
}
