import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer, owner } = await hre.getNamedAccounts();

    await hre.deployments.deploy("NFTMarketplaceEscrow", {
        from: deployer,
        args: ["ArtstockNFTToken", "ATSK", "ipfs://base-uri/", "ipfs://contract-uri", owner], 
        log: true,
    });
};

export default func;
func.tags = [ "Escrow"];
