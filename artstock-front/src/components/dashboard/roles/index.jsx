import MaxWidthWrapper from "@/components/MaxWidhWrapper";
import Buyer from "./Buyer";
import Curator from "./Curator";
import Guardian from "./Guardian";
import Seller from "./Seller";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DynamicWeb3 from "@/components/dashboard/dynamic"

export default function Roles() {
  const [address, setAddress] = useState();

  const handleInput = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col">
        <img src="" />
        <p>Create and Validate Roles Here</p>
        <DynamicWeb3/>
        <Input onChange={handleInput} value={address} />
        <Buyer address={address} value={address} />
        <Guardian address={address} value={address} />
        <Curator address={address} value={address} />
        <Seller address={address} value={address} />
      </div>
    </MaxWidthWrapper>
  );
}
