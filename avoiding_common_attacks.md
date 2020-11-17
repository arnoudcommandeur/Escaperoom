# Avoiding common attacks

The following steps were taken to avoid common attacks:

## Integer Overflow and Underflow (SWC-101)

When adding or substracting values to and from token balances, all calculations are done via the SafeMath.sol library.

This meens calculations are done with value.add and value.sub.

## Using best practices and battle tested base contracts

I have used battle tested base contracts from OpenZeppeling. I used the ERC1155PresetMinterPauser.sol contract as the base contract. See here for more info: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/audit/2018-10.pdf

