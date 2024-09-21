import { Button } from "@/components/ui/button";
export default function Curator() {
  const handleCurator = async () => {};
  return (
    <div>
      <Button
        className="m-3 w-1/2 bg-green-200 text-black"
        onClick={handleCurator}
      >
        Assign Curator Role
      </Button>
    </div>
  );
}
