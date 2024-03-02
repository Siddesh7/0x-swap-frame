// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract frameSwap is ReentrancyGuard{

    event BoughtTokens(IERC20 sellToken, IERC20 buyToken, uint256 boughtAmount);
    address public owner;
    address public exchangeProxy;


    constructor(address _exchangeProxy) ReentrancyGuard() {
        exchangeProxy = _exchangeProxy;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }


    receive() external payable {}

    // Transfer tokens held by this contrat to the sender/owner.
     function withdrawToken(IERC20 token, uint256 amount)
        external
        onlyOwner

    {
        require(token.transfer(msg.sender, amount));
    }

    function withdrawETH(uint256 amount)
        external
        onlyOwner
    
    {
        (payable(msg.sender)).transfer(amount);
    }
      
    function fillQuote(
        IERC20 sellToken,
        IERC20 buyToken,
        address spender,
        address payable swapTarget,
        bytes calldata swapCallData,
        uint256 buyAmount,
        address seller
    )
        external
        onlyOwner
        payable 
        ReentrancyGuard.nonReentrant  // Ensure reentrancy protection
    {
        // Checks that the swapTarget is actually the address of 0x ExchangeProxy
        require(swapTarget == exchangeProxy, "Target not ExchangeProxy");
        uint256 boughtAmount = buyToken.balanceOf(address(this));
        SafeERC20.safeTransferFrom(sellToken, seller, address(this), buyAmount);
      
        sellToken.approve(spender,34567654345676543456765434567654567);  // Set allowance to max

        (bool success,) = swapTarget.call{value: msg.value}(swapCallData);
        require(success, 'SWAP_CALL_FAILED');
        boughtAmount = buyToken.balanceOf(address(this)) - boughtAmount;
        buyToken.transfer(seller, boughtAmount);
        emit BoughtTokens(sellToken, buyToken, boughtAmount);
        sellToken.transfer(seller, sellToken.balanceOf(address(this)));
        // Refund any unspent protocol fees to the sender.
        payable(msg.sender).transfer(address(this).balance);

    }
}