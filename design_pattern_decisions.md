# Design pattern decisions

The following design patterns have been implemented:

## Circuit braker
I have used the OpenZeppeling ERC1155PresetMinterPauser.sol as the base contract from which my own contract inherits. The base contract has implemented the circuit braker via the Pausable.sol contract.

This Pausable.sol contract makes several functions available. The 2 most important functions are:

* _pause
* _unpause

Both functions are internal and are implemented in the _beforeTokenTransfer function within the ERC1155Pausable.sol base contract.


## Restricting Access
I used the Role based access security from the AccessControl.sol base contract. This is an OpenZeppeling battle tested contract.

The AccessControl contract makes several functions available. The most imported functions are:

* hasRole
* getRoleMember
* grantRole
* revokeRole

The Access control is flexible. New roles can be created an invoked on the fly.

In my own contract Collectables.sol you can see that I have used the hasRole function within a require statement:

    require(hasRole(DEFAULT_ADMIN_ROLE,msg.sender) == true, "ERROR: Calling address does not have DEFAULT_ADMIN_ROLE role");

## Use call.value() for Ether transfer

It's better to use msg.sender.call.value(amount)("") instead of transfer() and send() functions. See https://consensys.github.io/smart-contract-best-practices/recommendations/#dont-use-transfer-or-send vor more information.