import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer, owner } = await hre.getNamedAccounts();

    await hre.deployments.deploy("EscrowDebug", {
        from: deployer,
        args: ["0xd9Fb72F495560Ec0A60Fb8c2CaE0C3a39cAF5d08"], 
        log: true,
    });
};

export default func;
func.tags = [ "Debug"];
