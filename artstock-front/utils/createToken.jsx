import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getWeb3Provider, getSigner } from "@dynamic-labs/ethers-v6";



const createToken = async () => {
  const { primaryWallet } = useDynamicContext();
  try {
    const provider = await getWeb3Provider(primaryWallet);
    const signer = await getSigner(primaryWallet);


    console.log(provider)
    console.log(signer)
  } catch (e) {
    console.log(e);
  }
};

export default createToken;
