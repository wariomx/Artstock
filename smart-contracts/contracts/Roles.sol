// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Roles {
	enum Role {
		None,
		Seller,
		Guardian,
		Curator,
		Buyer
	}

	struct Seller {
		address sellerAddress;
		string name;
	}

	struct Guardian {
		address guardianAddress;
		string name;
		string location;
	}

	struct Curator {
		address curatorAddress;
		string name;
		string location;
		string specialization;
	}

	struct Buyer {
		address buyerAddress;
		string name;
	}

	mapping(address => Role) public roles;
	mapping(address => Seller) public sellers;
	mapping(address => Guardian) public guardians;
	mapping(address => Curator) public curators;
	mapping(address => Buyer) public buyers;

	event RoleAssigned(address indexed account, Role role);

	function assignSeller(
		address _sellerAddress,
		string memory _name
	) external {
		roles[_sellerAddress] = Role.Seller;
		sellers[_sellerAddress] = Seller(_sellerAddress, _name);
		emit RoleAssigned(_sellerAddress, Role.Seller);
	}

	function assignGuardian(
		address _guardianAddress,
		string memory _name,
		string memory _location
	) external {
		roles[_guardianAddress] = Role.Guardian;
		guardians[_guardianAddress] = Guardian(
			_guardianAddress,
			_name,
			_location
		);
		emit RoleAssigned(_guardianAddress, Role.Guardian);
	}

	function assignCurator(
		address _curatorAddress,
		string memory _name,
		string memory _location,
		string memory _specialization
	) external {
		roles[_curatorAddress] = Role.Curator;
		curators[_curatorAddress] = Curator(
			_curatorAddress,
			_name,
			_location,
			_specialization
		);
		emit RoleAssigned(_curatorAddress, Role.Curator);
	}

	function assignBuyer(address _buyerAddress, string memory _name) external {
		roles[_buyerAddress] = Role.Buyer;
		buyers[_buyerAddress] = Buyer(_buyerAddress, _name);
		emit RoleAssigned(_buyerAddress, Role.Buyer);
	}

	function getRole(address _address) external view returns (Role) {
		return roles[_address];
	}
}
