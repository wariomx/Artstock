import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer, owner } = await hre.getNamedAccounts()

	await hre.deployments.deploy("NFTMarketplaceEscrow", {
		from: deployer,
		args: ["0x51Da4c327A216A9029240d9EA93E66C7ccc220E6"],
		log: true,
	})
}
export default func
func.tags = ["Escrow"]
