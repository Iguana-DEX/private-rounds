// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

/// @title PrivateGroupFactory - Deploy new PrivateRounds contracts
/// @author styliann.eth <ns2808@proton.me>

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./PrivateRounds.sol";

contract PrivateGroupFactory is AccessControl {
    event NewGroupCreated(
        uint32 groupId,
        address groupAddress,
        address groupCreator
    );
    event GroupInfoChanged(
        uint32 groupId,
        string groupName,
        string groupDescription,
        string groupImageUrl,
        string groupInfoUrl
    );

    PrivateRounds[] public groups;

    // Investor addresses must be granted MEMBER_ROLE by contract deployer
    bytes32 public constant CONTRACT_CREATOR_ROLE =
        keccak256("CONTRACT_CREATOR_ROLE");

    constructor() {
        // IguanaDEX Safe gets DEFAULT_ADMIN_ROLE
        _grantRole(
            DEFAULT_ADMIN_ROLE,
            0xE6ae1e6B67ad5D92F9a16B4CcaB45210DA43c8Da
        );
        _grantRole(
            CONTRACT_CREATOR_ROLE,
            0xE6ae1e6B67ad5D92F9a16B4CcaB45210DA43c8Da
        );
    }

    function createNewGroup(
        string memory _groupName,
        string memory _description,
        string memory _imageUrl,
        string memory _infoUrl
    ) public onlyRole(CONTRACT_CREATOR_ROLE) {
        PrivateRounds group = new PrivateRounds(msg.sender, _groupName);
        groups.push(group);

        uint32 groupId = uint32(groups.length - 1);

        emit NewGroupCreated(groupId, address(group), msg.sender);
        emit GroupInfoChanged(
            groupId,
            _groupName,
            _description,
            _imageUrl,
            _infoUrl
        );
    }

    function changeGroupInfo(
        uint32 _groupId,
        string memory _groupName,
        string memory _description,
        string memory _imageUrl,
        string memory _infoUrl
    ) public onlyRole(CONTRACT_CREATOR_ROLE) {
        bool isDefaultAdmin = PrivateRounds(groups[_groupId]).hasRole(
            DEFAULT_ADMIN_ROLE,
            msg.sender
        );
        require(isDefaultAdmin, "need DEFAULT_ADMIN_ROLE");
        emit GroupInfoChanged(
            _groupId,
            _groupName,
            _description,
            _imageUrl,
            _infoUrl
        );
    }
}
