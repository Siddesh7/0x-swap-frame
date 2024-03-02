export function getTokenPair(index: number) {
  switch (index) {
    case 1:
      return {
        buyToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        sellToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        buyTokenName: "USDC",
        sellTokenName: "USDT",
        buyTokenDecimals: 6,
        sellTokenDecimals: 6,
      };
    case 2:
      return {
        buyToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        sellToken: "0x5fe2B58c013d7601147DcdD68C143A77499f5531",
        buyTokenName: "USDT",
        sellTokenName: "GRT",
        buyTokenDecimals: 6,
        sellTokenDecimals: 18,
      };
    case 3:
      return {
        buyToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        sellToken: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
        buyTokenName: "USDT",
        sellTokenName: "UNI",
        buyTokenDecimals: 6,
        sellTokenDecimals: 18,
      };
    case 4:
      return {
        buyToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        sellToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        buyTokenName: "USDT",
        sellTokenName: "USDC",
        buyTokenDecimals: 6,
        sellTokenDecimals: 6,
      };
    default:
      return null;
  }
}

export function getTokenName(address: string) {
  switch (address) {
    case "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359":
      return "USDC";
    case "0xc2132D05D31c914a87C6611C10748AEb04B58e8F":
      return "USDT";
    case "0x5fe2B58c013d7601147DcdD68C143A77499f5531":
      return "GRT";
    case "0xb33EaAd8d922B1083446DC23f610c2567fB5180f":
      return "UNI";
    default:
      return null;
  }
}
export function getTokenAddress(tokenName: string) {
  switch (tokenName) {
    case "USDC":
      return "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
    case "USDT":
      return "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
    case "GRT":
      return "0x5fe2B58c013d7601147DcdD68C143A77499f5531";
    case "UNI":
      return "0xb33EaAd8d922B1083446DC23f610c2567fB5180f";
    default:
      return null;
  }
}

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_exchangeProxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "sellToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "buyToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "boughtAmount",
        type: "uint256",
      },
    ],
    name: "BoughtTokens",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "sellToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "buyToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "swapTarget",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "swapCallData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "fillQuote",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "exchangeProxy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const ADDRESS = "0xf2fe7a1Fcc7897C8fEB0d0AED950D6F823B568aA";
