"use client";
import React from "react";
import {useWriteContract} from "wagmi";
import {erc20Abi} from "viem";
interface ApproveButtonProps {
  tokenAddress: `0x${string}`;
  args: any;
  name: string;
  spender: `0x${string}`;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  tokenAddress,
  name,
  args,
  spender,
}) => {
  const {writeContractAsync} = useWriteContract();
  const approveToken = async () => {
    console.log(`Approving token ${tokenAddress}`);
    await writeContractAsync({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [spender, args],
    });
  };
  return (
    <button className="btn btn-secondary" onClick={approveToken}>
      Approve {name}
    </button>
  );
};

export default ApproveButton;
