// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Roles {
    // Enum for the different roles in the system
    enum Role {
        None,      // No specific role
        User,      // Regular user role
        Guardian,  // Guardian role
        Curator    // Curator role
    }

    // Define a User role structure
    struct User {
        address userAddress;  // Address of the user
        string name;          // Name of the user
    }

    // Define a Guardian role structure
    struct Guardian {
        address guardianAddress; // Address of the guardian
        string name;             // Name of the guardian
        string location;         // Guardian's location
    }

    // Define a Curator role structure
    struct Curator {
        address curatorAddress;  // Address of the curator
    }

    // Mappings to store roles and corresponding data
    mapping(address => Role) public roles;
    mapping(address => User) public users;
    mapping(address => Guardian) public guardians;
    mapping(address => Curator) public curators;

    // Event to log role assignment
    event RoleAssigned(address indexed account, Role role);

    // Assign a User role
    function assignUser(address _userAddress, string memory _name) external {
        roles[_userAddress] = Role.User;
        users[_userAddress] = User(_userAddress, _name);
        emit RoleAssigned(_userAddress, Role.User);
    }

    // Assign a Guardian role
    function assignGuardian(
        address _guardianAddress,
        string memory _name,
        string memory _location
    ) external {
        roles[_guardianAddress] = Role.Guardian;
        guardians[_guardianAddress] = Guardian(_guardianAddress, _name, _location);
        emit RoleAssigned(_guardianAddress, Role.Guardian);
    }

    // Assign a Curator role
    function assignCurator(address _curatorAddress) external {
        roles[_curatorAddress] = Role.Curator;
        curators[_curatorAddress] = Curator(_curatorAddress);
        emit RoleAssigned(_curatorAddress, Role.Curator);
    }

    // Function to get the role of an address
    function getRole(address _address) external view returns (Role) {
        return roles[_address];
    }

    // Function to retrieve User information
    function getUser(address _address) external view returns (User memory) {
        require(roles[_address] == Role.User, "Address is not a User");
        return users[_address];
    }

    // Function to retrieve Guardian information
    function getGuardian(address _address) external view returns (Guardian memory) {
        require(roles[_address] == Role.Guardian, "Address is not a Guardian");
        return guardians[_address];
    }

    // Function to retrieve Curator information
    function getCurator(address _address) external view returns (Curator memory) {
        require(roles[_address] == Role.Curator, "Address is not a Curator");
        return curators[_address];
    }
}
