//SPDX-License-Identifier: MIT 

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/INFTCollection.sol";

contract Lottery is Ownable {
    //manager is in charge of the contract 
    address public manager;
    //new player in the contract using array[] to unlimit number 
    address payable[] public players;

    INFTCollection nft;

    constructor(address _nftAddress){
        nft = INFTCollection(_nftAddress);
        manager = msg.sender;
    }

    function setManager(address _manager) public onlyOwner{
        manager = _manager;
    }

    function enter() public payable{
        require(msg.value >= .001 ether);
        players.push(payable(msg.sender));
    }

    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    function pickWinner() public restricted{
        uint index = random() % players.length;
        nft.mint(players[index]);

        payable (players[index]).transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
}