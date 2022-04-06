// SPDX-License-Identifier: UNLICENSED.
pragma solidity ^0.8.0;

contract VolcanoCoin {

    struct Payment {
        uint transferAmount;
        address recipient;
    }

    uint totalSupply = 10000;
    address owner;

    event TotalSupplyIncrease(uint);
    event TransferToken(uint, address);

    mapping(address => uint) public balances;
    mapping(address => Payment[]) payments;

    constructor () {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function getTotalSupply() public view returns (uint){
        return totalSupply;
    }

    function increaseTotalSupply() public onlyOwner {
        totalSupply += 1000;
        balances[owner] = totalSupply;
        emit TotalSupplyIncrease(totalSupply);
    }

    function transfer(uint amountTransfer, address recipient) public {
        require(balances[msg.sender] >= amountTransfer, "Not enough tokens");
        if(msg.sender == owner) {
            totalSupply-=amountTransfer;
        }
        balances[msg.sender] -= amountTransfer;
        balances[recipient] += amountTransfer;
        payments[msg.sender].push(Payment(amountTransfer, recipient));
        emit TransferToken(amountTransfer, recipient);

    }
}
