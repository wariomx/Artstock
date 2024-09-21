// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { MockERC721 } from "./ERC721.sol";

contract NFTMarketplaceEscrow {
    struct Escrow {
        address seller;
        address buyer;
        uint256 price;
        uint256 tokenId;
        bool isComplete;
    }

    MockERC721 public nftContract;
    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event PaymentDeposited(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 amount
    );
    event EscrowCompleted(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer
    );
    event EscrowCancelled(uint256 indexed tokenId, address indexed seller);

    constructor(address _nftContract) {
        nftContract = MockERC721(_nftContract);
    }

    /**
     * @dev Seller creates an escrow for an NFT by specifying buyer and price.
     */
    function createEscrow(
        address buyer,
        uint256 tokenId,
        uint256 price
    ) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(price > 0, "Price must be greater than zero");
        require(escrows[tokenId].seller == address(0), "Escrow already exists");

        // Transfer NFT from seller to this contract
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        escrows[tokenId] = Escrow({
            seller: msg.sender,
            buyer: buyer,
            price: price,
            tokenId: tokenId,
            isComplete: false
        });

        emit EscrowCreated(tokenId, msg.sender, buyer, price);
    }

    /**
     * @dev Buyer deposits payment into escrow.
     */
    function depositPayment(uint256 tokenId) external payable {
        Escrow storage escrow = escrows[tokenId];
        require(escrow.buyer == msg.sender, "You are not the designated buyer");
        require(!escrow.isComplete, "Escrow already completed");
        require(msg.value == escrow.price, "Incorrect payment amount");

        emit PaymentDeposited(tokenId, msg.sender, msg.value);
    }

    /**
     * @dev Completes the escrow, transferring the NFT to the buyer and funds to the seller.
     */
    function completeEscrow(uint256 tokenId) external {
        Escrow storage escrow = escrows[tokenId];
        require(escrow.buyer == msg.sender || escrow.seller == msg.sender, "Not authorized");
        require(!escrow.isComplete, "Escrow already completed");

        // Transfer funds to seller
        payable(escrow.seller).transfer(escrow.price);

        // Transfer NFT to buyer
        nftContract.safeTransferFrom(address(this), escrow.buyer, tokenId);

        escrow.isComplete = true;

        emit EscrowCompleted(tokenId, escrow.seller, escrow.buyer);
    }

    /**
     * @dev Cancels the escrow and returns the NFT to the seller if the deal is not completed.
     */
    function cancelEscrow(uint256 tokenId) external {
        Escrow storage escrow = escrows[tokenId];
        require(escrow.seller == msg.sender, "Only seller can cancel");
        require(!escrow.isComplete, "Cannot cancel a completed escrow");

        // Return NFT to seller
        nftContract.safeTransferFrom(address(this), escrow.seller, tokenId);

        delete escrows[tokenId];

        emit EscrowCancelled(tokenId, escrow.seller);
    }
}
