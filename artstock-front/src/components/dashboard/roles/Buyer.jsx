import { Button } from "@/components/ui/button";
import { abi } from "../../../../utils/abi";
import { useWriteContract } from "wagmi";

export default function Buyer({ address }) {
  const { writeContract } = useWriteContract();

  const handleAssignBuyer = async () => {
    console.log(address);
    console.log(abi);
    try {
      const result = writeContract({
        abi,
        address: "0xdd9Fa9ddD68dd5aA023149Df488B4985ADC0e667",
        functionName: "assignBuyer",
        args: [address, "wario"],
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
        onClick={handleAssignBuyer}
      >
        Assign Buyer Role
      </Button>
    </div>
  );
}
