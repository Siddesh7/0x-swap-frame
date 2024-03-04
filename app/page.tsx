"use client";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useWriteContract} from "wagmi";
import {erc20Abi} from "viem";
import {getTokenAddress, supportedTokens} from "./lib/constants";
import ApproveButton from "./components/ApproveButton";
const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/input`;

export default function Home() {
  const {data: hash, writeContract} = useWriteContract();
  const approveSpend = async (tokenName: string) => {
    const tokenAddress = getTokenAddress(tokenName);
    if (!tokenAddress) return console.error("Token not found");
    writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        "0xf2fe7a1Fcc7897C8fEB0d0AED950D6F823B568aA",
        BigInt("154206879078532699846656405640394575840087787878"),
      ],
    });
  };
  return (
    <main className="flex flex-col text-center lg:p-4">
      <nav className="flex flex-row justify-between p-4">
        <p className="text-bold text-3xl">frameSwap</p>
        <ConnectButton />
      </nav>

      <div className="mt-[10%]">
        <p className="text-xl text-white">
          Before being able to swap from warpcast, you need to provide allowance
          to this contract.{" "}
          <a
            href="https://polygonscan.com/address/0xf2fe7a1Fcc7897C8fEB0d0AED950D6F823B568aA"
            target="blank"
          >
            <code>0xf2fe7a1Fcc7897C8fEB0d0AED950D6F823B568aA</code>
          </a>
        </p>
        <div className="flex flex-col justify-center gap-2 mt-4">
          <p className="text-xl">Token Pairs Supported</p>
          <ul className="flex  flex-row justify-center gap-8">
            <p>Supported Tokens: {Object.keys(supportedTokens).join(", ")}</p>
          </ul>
          <ul className="flex  flex-row justify-center gap-8 flex-wrap">
            {Object.entries(supportedTokens).map(([key, value]: [any, any]) => (
              <li key={key}>
                <ApproveButton
                  tokenAddress={value.address}
                  name={key}
                  args={BigInt(
                    "154206879078532699846656405640394575840087787878"
                  )}
                  spender="0xf2fe7a1Fcc7897C8fEB0d0AED950D6F823B568aA"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
