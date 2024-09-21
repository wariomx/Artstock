// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./ArtStock.sol";

contract EscrowDebug {
    ArtStock public artStockContract;

    event DebugSuccess(uint256 tokenId, string message);
    event DebugFailure(uint256 tokenId, string reason);
    event DebugFailureLowLevel(uint256 tokenId, bytes data);

    constructor(address _artStockContract) {
        artStockContract = ArtStock(_artStockContract); // Corrected type casting
    }

    function tryCompleteEscrow(uint256 tokenId) external {
        try artStockContract.completeEscrow(tokenId) { // Use the instance variable
            emit DebugSuccess(tokenId, "Escrow completed successfully");
        } catch Error(string memory reason) {
            // This is executed in case of a revert() or require()
            emit DebugFailure(tokenId, reason);
        } catch (bytes memory lowLevelData) {
            // This is executed in case of a low-level error
            emit DebugFailureLowLevel(tokenId, lowLevelData);
        }
    }
}
