//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/INFTCollection.sol";

contract Lottery is Ownable {
    //manager is in charge of the contract 
    address public manager;
    //new player in the contract using array[] to unlimit number 
    address[] public players;

    INFTCollection nft;

    constructor(address _nftAddress){
        nft = INFTCollection(_nftAddress);
        manager = msg.sender;
    }

    function setManager(address _manager) public onlyOwner{
        manager = _manager;
    }

    function enter() public payable{
        require(msg.value >= .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    function pickWinner() public restricted{
        uint index = random() % players.length;

        payable (players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
}