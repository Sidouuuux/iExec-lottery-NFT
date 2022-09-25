// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable {
    //Variables
    address payable[] public players;
    uint256 public lotteryId;
    mapping(uint256 => address payable) public lotteryHistory;
    bool public isActive;

    //Events
    event LotteryEnter(address indexed player);
    event WinnerPicked(address indexed player);

    constructor() {
        lotteryId = 1;
    }

    /*
     * Function setIsActive to activate/desactivate the smart contract
     */
    function setIsActive(bool _isActive) external onlyOwner {
        isActive = _isActive;
    }

    /*
     * Function getWinnerByLottery to get winner of passed lottery
     */
    function getWinnerByLottery(uint256 lottery)
        public
        view
        returns (address payable)
    {
        return lotteryHistory[lottery];
    }

    /*
     * Function getBalance to get the balance of the smart contract
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /*
     * Function getPlayers to get players of the current lottery
     */
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    /*
     * Function getLotteryId to get current lottery id
     */
    function getLotteryId() public view returns (uint256) {
        return lotteryId;
    }

    /*
     * Function enterLottery to participate to a lottery
     */
    function enterLottery() public payable {
        require(msg.value >= .01 ether);

        // address of player entering lottery
        players.push(payable(msg.sender));
        emit LotteryEnter(msg.sender);
    }

    /*
     * Function getRandomNumber to get a random number
     */
    function getRandomNumber() public view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
    }

    /*
     * Function pickWinner to get a winner for the current lottery
     */
    function pickWinner() public onlyOwner {
        uint256 index = getRandomNumber() % players.length;
        address payable recentWinner = players[index];

        recentWinner.transfer(address(this).balance);
        lotteryHistory[lotteryId] = recentWinner;
        lotteryId++;

        // reset the state of the contract
        players = new address payable[](0);
        emit WinnerPicked(recentWinner);
    }
}
