import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer, owner } = await hre.getNamedAccounts();

    await hre.deployments.deploy("ArtStock", {
        from: deployer,
        args: ["ArtstockNFTToken", "ATSK", "ipfs://base-uri/", "ipfs://contract-uri", owner], 
        log: true
    });
};

export default func;
func.tags = [ "ArtStock"];


// Escrow Factory 0xd9Fb72F495560Ec0A60Fb8c2CaE0C3a39cAF5d08 

// Debugger 0x51F840533D5d844655DA97ab2E3B30f8771fAa52