// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { MockERC721 } from "./ERC721.sol";
import { Roles } from "./Roles.sol";

contract NFTMarketplaceEscrow is MockERC721, Roles {
    struct Escrow {
        address seller;
        address buyer;
        address curator;
        address guardian;
        uint256 price;
        uint256 tokenId;
        bool isComplete;
    }

    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(
        uint256 indexed tokenId,
        address indexed seller,
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

    event EscrowCancelled(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed guardian
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        string memory contractURI,
        address owner
    ) MockERC721(name, symbol, baseURI, contractURI, owner) {}

    modifier onlyBuyer(uint256 tokenId) {
        require(
            escrows[tokenId].buyer == msg.sender,
            "You are not the designated buyer"
        );
        _;
    }

    modifier onlySeller(uint256 tokenId) {
        require(
            escrows[tokenId].seller == msg.sender,
            "You are not the seller"
        );
        _;
    }

    modifier escrowExists(uint256 tokenId) {
        require(escrows[tokenId].seller != address(0), "Escrow does not exist");
        _;
    }

    /**
     * @dev Seller creates an escrow for an NFT by specifying the buyer and price.
     */
    function createEscrow(
        address buyer,
        uint256 tokenId,
        uint256 price,
        address curator,
        address guardian
    ) external {
        require(
            ownerOf(tokenId) == msg.sender,  // Use inherited ownerOf from MockERC721
            "You are not the owner"
        );
        require(price > 0, "Price must be greater than zero");
        require(escrows[tokenId].seller == address(0), "Escrow already exists");

        // Transfer NFT from seller to this contract
        transferFrom(msg.sender, address(this), tokenId);  // Use inherited transferFrom

        escrows[tokenId] = Escrow({
            seller: msg.sender,
            buyer: buyer,
            curator: curator,
            guardian: guardian,
            price: price,
            tokenId: tokenId,
            isComplete: false
        });

        emit EscrowCreated(tokenId, msg.sender, price);
    }

    /**
     * @dev Buyer deposits payment into escrow.
     */
    function depositPayment(
        uint256 tokenId
    ) external payable onlyBuyer(tokenId) escrowExists(tokenId) {
        Escrow storage escrow = escrows[tokenId];
        require(!escrow.isComplete, "Escrow already completed");
        require(msg.value == escrow.price, "Incorrect payment amount");

        emit PaymentDeposited(tokenId, msg.sender, msg.value);
    }

    /**
     * @dev Completes the escrow, transferring the NFT to the buyer and funds to the seller.
     */
    function completeEscrow(uint256 tokenId) external escrowExists(tokenId) {
        Escrow storage escrow = escrows[tokenId];
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.seller,
            "Not authorized"
        );
        require(!escrow.isComplete, "Escrow already completed");

        // Transfer funds to seller
        payable(escrow.seller).transfer(escrow.price);

        // Transfer NFT to buyer
        safeTransferFrom(address(this), escrow.buyer, tokenId);  // Use inherited safeTransferFrom

        escrow.isComplete = true;

        emit EscrowCompleted(tokenId, escrow.seller, escrow.buyer);
    }

    /**
     * @dev Cancels the escrow and returns the NFT to the seller if the deal is not completed.
     */
    function cancelEscrow(
        uint256 tokenId
    ) external onlySeller(tokenId) escrowExists(tokenId) {
        Escrow storage escrow = escrows[tokenId];
        require(!escrow.isComplete, "Cannot cancel a completed escrow");

        // Return NFT to seller
        safeTransferFrom(address(this), escrow.seller, tokenId);  // Use inherited safeTransferFrom

        delete escrows[tokenId];

        emit EscrowCancelled(tokenId, escrow.seller, escrow.guardian);
    }
}
