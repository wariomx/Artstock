// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { MockERC721 } from "./ERC721.sol";
import { Roles } from "./Roles.sol";

contract NFTMarketplaceEscrow is MockERC721, Roles {

	struct Art {
		string name;
		string description;
		string image;
        uint256 price;
		bool isDeposited;
		bool isCurated;
	}

	struct Escrow {
		address seller;
		address buyer;
		address curator;
		address guardian;
		uint256 tokenId;
		uint256 price;
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

	modifier onlyCurator() {
		require(roles[msg.sender] == Role.Curator, "Caller is not a curator");
		_;
	}

	modifier onlyGuardian() {
		require(roles[msg.sender] == Role.Guardian, "Caller is not a guardian");
		_;
	}

	modifier escrowExists(uint256 tokenId) {
		require(escrows[tokenId].seller != address(0), "Escrow does not exist");
		_;
	}

	mapping(uint256 => Art) public artCollection;

	/**
	 * @dev Owner mints an Art NFT
	 */
	function mintArt(
		string memory _name,
		string memory _description,
        string memory _image,
        uint256 _price,
		address to,
		uint256 tokenId
	) external {
		_safeMint(to, tokenId);

		artCollection[tokenId] = Art({
			name: _name,
			description: _description,
            image: _image,
            price: _price,
			isDeposited: false,
			isCurated: false
		});
	}

	/**
	 * @dev Guardian validates the deposit and the autenticity of the NFT
	 */

	function physicalDeposit(uint256 tokenId) external onlyGuardian {
		artCollection[tokenId].isDeposited = true;
	}

	/**
	 * @dev Curator
	 */
	function curate(uint256 tokenId) external onlyCurator {
		artCollection[tokenId].isCurated = true;
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
			ownerOf(tokenId) == msg.sender, // Use inherited ownerOf from MockERC721
			"You are not the owner of the token"
		);
		require(price > 0, "Price must be greater than zero");
		require(escrows[tokenId].seller == address(0), "Escrow already exists");

		// Transfer NFT from seller to this contract
		transferFrom(msg.sender, address(this), tokenId); // Use inherited transferFrom

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
		(bool success, ) = escrow.seller.call{ value: escrow.price }("");
		require(success, "Payment transfer failed");

		// Transfer NFT to buyer
		safeTransferFrom(address(this), escrow.buyer, tokenId); // Use inherited safeTransferFrom

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
		safeTransferFrom(address(this), escrow.seller, tokenId); // Use inherited safeTransferFrom

		delete escrows[tokenId];

		emit EscrowCancelled(tokenId, escrow.seller, escrow.guardian);
	}

    struct Pool {
        uint256 totalLiquidity;
        mapping(address => uint256) liquidityProviders;
    }

    struct Loan {
        uint256 amount;
        uint256 interestRate; // E.g. 5 for 5%
        uint256 dueDate;
        bool isActive;
    }


    mapping(address => Pool) public liquidityPools; // Mapping of liquidity pools pers address
    mapping(uint256 => Loan) public loans; //Mapping for loans based on tokenId

    event LiquidityAdded(address indexed provider, uint256 amount);
    event LoanRequested(uint256 indexed tokenId, uint256 amount, uint256 dueDate);

    /**
     * @dev Allows users to add liquidity to their own pool.
     */
    function addLiquidity(uint256 _amount) external payable {
        require(msg.value == _amount, "Incorrect Ether amount sent");
        
        Pool storage pool = liquidityPools[msg.sender];
        pool.totalLiquidity += _amount;
        pool.liquidityProviders[msg.sender] += _amount;

        emit LiquidityAdded(msg.sender, _amount);
    }

    /**
     * @dev Allows NFT holders to request a loan using their art NFT as collateral.
     */
    function askLoan(uint256 _amount, uint256 _tokenId, uint256 _interestRate, uint256 _durationDays) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        require(artCollection[_tokenId].isDeposited, "Art must be deposited");

        Loan storage loan = loans[_tokenId];
        require(!loan.isActive, "Loan already active");

        uint256 dueDate = block.timestamp + (_durationDays * 1 days);
        loans[_tokenId] = Loan({
            amount: _amount,
            interestRate: _interestRate,
            dueDate: dueDate,
            isActive: true
        });

        emit LoanRequested(_tokenId, _amount, dueDate);
        
        // Optionally, transfer funds to the borrower
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Loan transfer failed");
    }
}
