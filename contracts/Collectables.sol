// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";

contract Collectables is ERC1155PresetMinterPauser {

    struct s_Escaperoom {
        uint _Id;
        string _Name;
        address _Admin;
        uint _TotalCollectables;
    }

    //bytes32 public constant ESCAPEROOM_ADMIN_ROLE = keccak256("ESCAPEROOM_ADMIN_ROLE");
    uint public EscapeRoomCounter;
    mapping(uint => s_Escaperoom) public Escaperooms;
    mapping(address => uint) public EscaperoomAdmins;

    constructor() public ERC1155PresetMinterPauser("https://erc1155metadata.azurewebsites.net/api/token/{id}") {
        // _mint(msg.sender, 2, 1, "");
        // _mint(msg.sender, 0, 10**18, "");
    }

    function createEscaperoom(address _EscaperoomAdmin, string memory _Name, uint _TotalCollectables) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "Error: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_TotalCollectables > 0, "Error: TotalCollectables must be > 0");
        require(_EscaperoomAdmin != address(0), "Error: _EscaperoomAdmin is invalid");

        EscaperoomAdmins[_EscaperoomAdmin] = EscapeRoomCounter;

        //grantRole(ESCAPEROOM_ADMIN_ROLE, _EscaperoomAdmin);

        s_Escaperoom memory tmpEscaperoom;
        tmpEscaperoom._Id = EscapeRoomCounter;
        tmpEscaperoom._Name = _Name;
        tmpEscaperoom._Admin = _EscaperoomAdmin;
        tmpEscaperoom._TotalCollectables = _TotalCollectables;

        Escaperooms[EscapeRoomCounter] = tmpEscaperoom;
        EscapeRoomCounter += 1;

        _mint(_EscaperoomAdmin, EscapeRoomCounter, _TotalCollectables, "");
    }

}
