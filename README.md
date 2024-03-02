## FrameSwap
frameSwap lets you swap ERC20 tokens in Polygon Mainnet from  within Farcaster (Warpcast) in just few clicks! This project is built using **0x Project Price and Swap API** to get the best route to swap the tokens.

https://0x-frame.vercel.app/frame can be shared as cast and make the swaps within warpcast.

### Prerequisites:
Before being able to swap, you should provide allowance to the swap contract deployed at [0xf2fe7a1fcc7897c8feb0d0aed950d6f823b568aa](https://polygonscan.com/address/0xf2fe7a1fcc7897c8feb0d0aed950d6f823b568aa) in Polygon Mainnet. You can do that via the frontend hosted at https://0x-frame.vercel.app or using the block explorer.

### Available Token Pairs
- USDC -> USDT
- USDT -> USDC
- UNI -> USDT
- GRT -> USDT

### Images
![Screenshot 2024-03-02 at 8 00 02 PM](https://github.com/Siddesh7/0x-swap-frame/assets/79219618/0b7aa3b7-ddb8-464f-962a-b60756747d26)
![Screenshot 2024-03-02 at 8 00 10 PM](https://github.com/Siddesh7/0x-swap-frame/assets/79219618/1dca9f18-247f-4107-9ce4-cdd65624b7d0)
![Screenshot 2024-03-02 at 8 00 31 PM](https://github.com/Siddesh7/0x-swap-frame/assets/79219618/f52a39ce-4e23-4ea4-b775-7c8d845b2882)
![Screenshot 2024-03-02 at 8 00 42 PM](https://github.com/Siddesh7/0x-swap-frame/assets/79219618/03e07519-5761-459a-af29-dcb6730c9c08)



### Build locally
```bash
pnpm install

pnpm dev
```

### Useful tools
- [NGROK](ngrok.com)
- [Warpcast Frame Validator](https://warpcast.com/~/developers/frames)
