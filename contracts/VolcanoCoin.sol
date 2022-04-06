// SPDX-License-Identifier: UNLICENSED.
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VolcanoCoin is Ownable, ERC20 {

    struct Payment {
        uint transferAmount;
        address recipient;
    }

    mapping(address => Payment[]) payments ;

    constructor() ERC20("VolcanoCoin","VC") {
       _mint(msg.sender, 10000);
    }

    function increaseTotalSupply() public onlyOwner {
       _mint(msg.sender, 1000);
    }

    function _afterTokenTransfer(  
        address from,
        address to,
        uint256 amount) internal override {
        payments[from].push(Payment(amount, to));
    }

     function getPayments(address from) public view returns(Payment[] memory) {
      return payments[from];
    }
}
