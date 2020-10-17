// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";

contract Collactables is ERC1155PresetMinterPauser {
    constructor() public ERC1155PresetMinterPauser("https://erc1155metadata.azurewebsites.net/api/token/{id}") {
        _mint(msg.sender, 0, 10**18, "");
        _mint(msg.sender, 1, 10**27, "");
        _mint(msg.sender, 2, 1, "");
        _mint(msg.sender, 3, 10**9, "");
        _mint(msg.sender, 4, 10**9, "");
    }

    // function mint(uint256 _id, uint256 _count) public onlyOwner {
    //     _mint(msg.sender, _id, _count, "");
    // }

    // function pause() public onlyOwner() {
    //     _pause();
    // }

    // function unpause() public onlyOwner() {
    //     _unpause();
    // }

}
