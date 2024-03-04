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
    default:
      return null;
  }
}

export const supportedTokens: any = {
  BUSD: {address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7", decimals: 18},
  DAI: {address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", decimals: 18},
  USDT: {address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6},
  USDC: {address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", decimals: 6},
  GRT: {address: "0x5fe2B58c013d7601147DcdD68C143A77499f5531", decimals: 18},
  UNI: {address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", decimals: 18},
  AAVE: {address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b", decimals: 18},
  APE: {address: "0xB7b31a6BC18e48888545CE79e83E06003bE70930", decimals: 18},
  AXL: {address: "0x6e4e624106cb12e168e6533f8ec7c82263358940", decimals: 6},
  MANA: {address: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4", decimals: 18},
  CRV: {address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF", decimals: 18},
  GNO: {address: "0x5FFD62D3C3eE2E81C00A7b9079FB248e7dF024A8", decimals: 18},
  "1INCH": {
    address: "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f",
    decimals: 18,
  },
  COMP: {address: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c", decimals: 18},
  FTM: {address: "0xc9c1c1c20b3658f8787cc2fd702267791f224ce1", decimals: 18},
  LINK: {address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", decimals: 18},
  SHIB: {address: "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec", decimals: 18},
  AVAX: {address: "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b", decimals: 18},
};

export function getTokenAddress(tokenName: string): any {
  const tokenKey = tokenName.toUpperCase() as keyof typeof supportedTokens;
  return supportedTokens[tokenKey];
}
export function getTokenName(address: string) {
  return Object.keys(supportedTokens).find(
    (key) => supportedTokens[key].address === address
  );
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
