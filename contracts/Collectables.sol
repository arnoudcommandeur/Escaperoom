// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";

/// @title A contract for collecting NFT as a reward for completing an Escape Room
/// @author Arnoud Commandeur
/// @notice At the moment 1 address is only able to have 1 type of NFT, in futere 1 address should be able to handle multiple NFT's (rooms to reward) 
/// @dev Contract based on OpenZeppelin ERC1155PresetMinterPauser.sol contract
contract Collectables is ERC1155PresetMinterPauser {

    // Struct for escaperooms
    struct s_Escaperoom {
        uint _Id;
        string _Name;
        address _Admin;
        uint _TotalCollectables;
        bool _enabled;
    }

    /// @notice Number of Escape Rooms 
    /// @dev Only increase value, do not decrease value
    /// @return Number of Escape Rooms which make use of this contract
    uint256 public EscapeRoomCounter = 0;

    /// @notice Price that an Escape Room holder must pay to the contract per token
    /// @dev Price must be >= 0
    /// @return The price per token
    uint256 public PricePerCollectable = 0 wei;

    /// @notice A mapping between de ID of an Escape Room and the details about the Escape Room
    /// @dev The struct could be removed to save gas, data could be stored off line / IPFS
    /// @return A struct about 1 particular Escape Room
    mapping(uint => s_Escaperoom) public Escaperooms;


    /// @notice A mapping between an Escape Room holder address and the ID of the Escape Room
    /// @dev An address/admin can only have one Escape Room, should be changed to handle more than 1 Escape Room
    /// @return The ID of the Escape Room which belongs to the address
    mapping(address => uint) public EscaperoomAdmins;

    /// @notice This event is emitted after rewarding the visitor with a new token
    /// @dev This event can be used to update UI after recieving token
    /// @param _visitor The address of the Escape Room visitor that recieved the token
    /// @param _id The ID of the Escape Room
    event visitorRewarded(address indexed _visitor, uint indexed _id);

    /// @notice This event is emitted after the price per token was changed
    /// @dev Price could be changed to Price per Escape Room
    /// @param _admin The address of the admin of the contract
    /// @param _pricePerCollectable The new price in wei per token a escape room holder must   
    event pricePerCollectableUpdated(address indexed _admin, uint _pricePerCollectable);

    /// @notice This function is executed when the contract is deployed to the Ethereum blockchain
    /// @dev The URI is not in use yet, but can be used to retrieve off chain values about a token
    constructor() public ERC1155PresetMinterPauser("https://erc1155metadata.azurewebsites.net/api/token/{id}") {
        // No code yet!
    }

    /// @notice This function creates a new Escape Room and gives free tokens once
    /// @dev This function uses the OpenZeppelin Roles contract for checking the propriate address of the caller 
    /// @param _EscaperoomAdmin The address of the new admin of the new escape room
    /// @param _Name The name of the new escape room
    /// @param _FreeCollectables The number of tokens the new escape room will recieve for free
    function createNewEscaperoom(address _EscaperoomAdmin, string memory _Name, uint _FreeCollectables) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_FreeCollectables >= 0, "ERROR: TotalCollectables must be >= 0");
        require(_EscaperoomAdmin != address(0), "ERROR: _EscaperoomAdmin is invalid");
        require(EscaperoomAdmins[_EscaperoomAdmin] == 0, "ERROR: User already has an escape room account");

        EscapeRoomCounter = EscapeRoomCounter.add(1);

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

    /// @notice This function rewards the visitor of an escape room. After rewarding the event visitorRewarded is emitted
    /// @dev This function can only be called by the admin of the escape room 
    /// @param _id The ID of the escape room
    /// @param _visitor The visitor that must be rewarded
    function rewardVisitor(uint _id, address _visitor) public {
        require(EscaperoomAdmins[msg.sender] == _id, "ERROR: User is not an admin of the Escaperoom!");
        require(balanceOf(_visitor, _id) == 0, "ERROR: User has collectable already");
        safeTransferFrom(msg.sender,_visitor,_id,1,"0x");

        // Emit event
        emit visitorRewarded(_visitor, _id);
    }

    /// @notice This function rewards multiple visitors of an escape room. After rewarding the event visitorRewarded is emitted per visitor
    /// @dev Function could be rewritten to safeBatchTransferFrom. Only reward user when user has not already been rewarded 
    /// @param _id The ID of the escape room
    /// @param _visitors The visitors that must be rewarded
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

    /// @notice This function mints new tokens for a escape room after paying the correct amount of ether (tokens * price) 
    /// @dev Function can only be invoked by the admin of the escape room
    /// @param _id The ID of the escape room
    /// @param _Amount The number of new tokens to mint
    function mint(uint _id, uint _Amount) payable public {
        require(EscaperoomAdmins[msg.sender] == _id, "ERROR: User is not an admin of the Escaperoom!");
        require(_Amount > 0, "ERROR: _Amount must be > 0");
        require(msg.value == (_Amount.mul(PricePerCollectable)), "ERROR: Too much/less ether sent");

        address EscaperoomAdmin = Escaperooms[_id]._Admin;
        _mint(EscaperoomAdmin, _id, _Amount, "");
        Escaperooms[_id]._TotalCollectables = Escaperooms[_id]._TotalCollectables.add(_Amount);
    }

    /// @notice This function mints new tokens for a escape room without paying ether 
    /// @dev Function can only be invoked by the admin of the contract (via OpenZeppeling membership)
    /// @param _id The ID of the escape room
    /// @param _Amount The number of new tokens to mint (for free)
    function mintAdmin(uint _id, uint _Amount) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_Amount > 0, "ERROR: _Amount must be > 0");

        address EscaperoomAdmin = Escaperooms[_id]._Admin;
        _mint(EscaperoomAdmin, _id, _Amount, "");
        Escaperooms[_id]._TotalCollectables = Escaperooms[_id]._TotalCollectables.add(_Amount);
    }

    /// @notice This function sets the new price per token in wei and emits the pricePerCollectableUpdated after completing
    /// @dev Function can only be invoked by the admin of the contract (via OpenZeppeling membership), price >= 0
    /// @param _newPricePerCollectable The new price in wei per token for all escape rooms
    function setPricePerCollectable(uint _newPricePerCollectable) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        require(_newPricePerCollectable >= 0, "ERROR: _newPricePerCollectable must >= 0");

        PricePerCollectable = _newPricePerCollectable;
        emit pricePerCollectableUpdated(msg.sender, _newPricePerCollectable);
    }

    /// @notice This function sends all collected Ether to the ADMIN of the contract
    /// @dev Function can only be invoked by the admin of the contract (via OpenZeppeling membership)
    /// @param _reciever Address who recieves the Ether
    function withdraw(address payable _reciever) public {
        require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");
        uint amount = address(this).balance;
        (bool success, ) = _reciever.call.value(amount)("");
        require(success, "Transfer failed.");
    }
}