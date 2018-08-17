pragma solidity ^0.4.17;

contract Lottery
{
    address public manager;
    address[] public players;
    
    constructor() public
    {
        manager = msg.sender;
    }
    
    function EnterLottery () public payable
    {
        assert(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
    
    function MinerAddy () public view returns (address)//JUST TO CHECK
    {
        return block.coinbase;
    }
   
    function Random() private view returns (uint)
    {
        return uint(sha256(abi.encodePacked(players, block.difficulty, block.coinbase, now)));
        
    }
    
    function PickaWinner () ManagerOnly public 
    {
        players[Random() % players.length].transfer(address(this).balance);
        players = new address[] (0);//RESETTING CONTRACT
    }
    
    modifier ManagerOnly
    {
        assert(msg.sender == manager);
        _;
    }
    
    function GetPlayers () public view returns (address[])
    {
        return players;
    }
}