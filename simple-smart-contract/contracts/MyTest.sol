// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event Widthrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockedTime) payable {
        require(block.timestamp < _unlockedTime, "Unlocked time sould be in ");

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockedTime, "Wait till the time period completed");
        require(msg.sender == owner, "You are not an oowner");

        emit Widthrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}