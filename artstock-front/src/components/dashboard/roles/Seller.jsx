import { Button } from "@/components/ui/button";

export default function Seller() {
  const handleSeller = async () => {};
  return (
    <div>
      <Button
        className="m-3 w-1/2 bg-green-200 text-black"
        onClick={handleSeller}
      >
        Assign Seller Role
      </Button>
    </div>
  );
}
