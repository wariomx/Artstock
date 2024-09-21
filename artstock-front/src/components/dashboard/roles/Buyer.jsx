import { Button } from "@/components/ui/button";

export default function Buyer({ address }) {
  const handleBuyer = async () => {
    console.log(address);
  };

  return (
    <div>
      <Button
        className="m-3 w-1/2 bg-green-200 text-black"
        onClick={handleBuyer}
      >
        Assign Buyer Role
      </Button>
    </div>
  );
}
