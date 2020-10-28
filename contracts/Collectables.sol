// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";

contract Collectables is ERC1155PresetMinterPauser {

    // Struct for escaperooms
    struct s_Escaperoom {
        uint _Id;
        string _Name;
        address _Admin;
        uint _TotalCollectables;
        bool _enabled;
    }

    // Escaperoom counter
    uint public EscapeRoomCounter = 0;

    // Conversionprice GWei per Collectable
    uint public PricePerCollectable = 0 wei;

    // Mapping between _id and escaperoom
    mapping(uint => s_Escaperoom) public Escaperooms;

    // Mapping between address and the _id of the escaperoom
    mapping(address => uint) public EscaperoomAdmins;

    // Events
    event visitorRewarded(address indexed _visitor, uint indexed _id);
    event pricePerCollectableUpdated(address indexed _admin, uint _pricePerCollectable);

    // Constructor
    constructor() public ERC1155PresetMinterPauser("https://erc1155metadata.azurewebsites.net/api/token/{id}") {
        // No code yet!
    }

    // Function to create a new escaperoom
    // Only for Admins of the contract
    // Escaperoom Admin will receive all tokens
    function createNewEscaperoom(address _EscaperoomAdmin, string memory _Name, uint _FreeCollectables) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_FreeCollectables > 0, "ERROR: TotalCollectables must be > 0");
        require(_EscaperoomAdmin != address(0), "ERROR: _EscaperoomAdmin is invalid");
        require(EscaperoomAdmins[_EscaperoomAdmin] == 0, "ERROR: User already has an escape room account");

        EscapeRoomCounter += 1;

        EscaperoomAdmins[_EscaperoomAdmin] = EscapeRoomCounter;

        s_Escaperoom memory tmpEscaperoom;
        tmpEscaperoom._Id = EscapeRoomCounter;
        tmpEscaperoom._Name = _Name;
        tmpEscaperoom._Admin = _EscaperoomAdmin;
        tmpEscaperoom._TotalCollectables = _FreeCollectables;
        tmpEscaperoom._enabled = true;

        Escaperooms[EscapeRoomCounter] = tmpEscaperoom;
        _mint(_EscaperoomAdmin, EscapeRoomCounter, _FreeCollectables, "");

    }

    // Function to reqard a visitor with a collectable
    // Only possible for EscaperoomAdmin
    // Emit event after reward for visitor App
    function rewardVisitor(uint _id, address _visitor) public {
        require(EscaperoomAdmins[msg.sender] == _id, "ERROR: User is not an admin of the Escaperoom!");
        require(balanceOf(_visitor, _id) == 0, "ERROR: User has collectable already");
        safeTransferFrom(msg.sender,_visitor,_id,1,"0x");

        // Emit event
        emit visitorRewarded(_visitor, _id);
    }

    // Function to reqard a visitor with a collectable
    // Only possible for EscaperoomAdmin
    // Emit event after reward for visitor App
    function rewardVisitorBatch(uint _id, address[] memory _visitors) public {
        require(EscaperoomAdmins[msg.sender] == _id, "ERROR: User is not an admin of the Escaperoom!");

        for (uint256 i = 0; i < _visitors.length; ++i) {
            // Only reward visitor who haven't finished the room yet
            if (balanceOf(_visitors[i], _id) == 0) {
                safeTransferFrom(msg.sender,_visitors[i],_id,1,"0x");

                // Emit event
                emit visitorRewarded(_visitors[i], _id);
            }
        }
    }

    // Mint new collectables for escaperoom
    // Only for Admins of the escaperoom
    // Needs ether to buy collectibles
    function mint(uint _id, uint _Amount) payable public {
        require(EscaperoomAdmins[msg.sender] == _id, "ERROR: User is not an admin of the Escaperoom!");
        require(_Amount > 0, "ERROR: _Amount must be > 0");
        require(msg.value == (_Amount * PricePerCollectable), "ERROR: Too much/less ether sent");

        address EscaperoomAdmin = Escaperooms[_id]._Admin;
        _mint(EscaperoomAdmin, _id, _Amount, "");
        Escaperooms[_id]._TotalCollectables += _Amount;
    }

    // Mint new collectables for escaperoom
    // Only for contract admins
    // Does not need Ether, free collectables!
    function mintAdmin(uint _id, uint _Amount) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_Amount > 0, "ERROR: _Amount must be > 0");

        address EscaperoomAdmin = Escaperooms[_id]._Admin;
        _mint(EscaperoomAdmin, _id, _Amount, "");
        Escaperooms[_id]._TotalCollectables += _Amount;
    }

    // Set new price per collectable
    // Only for contract admins
    function setPricePerCollectable(uint _newPricePerCollectable) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_newPricePerCollectable >= 0, "ERROR: _newPricePerCollectable must >= 0");

        PricePerCollectable = _newPricePerCollectable;
        emit pricePerCollectableUpdated(msg.sender, _newPricePerCollectable);
    }

}