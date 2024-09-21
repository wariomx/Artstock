import { Button } from "@/components/ui/button";
export default function Guardian() {
  const handleGuardian = async () => {};
  return (
    <div>
      <Button
        className="m-3 w-1/2 bg-green-200 text-black"
        onClick={handleGuardian}
      >
        Assign Guardian Role
      </Button>
    </div>
  );
}
