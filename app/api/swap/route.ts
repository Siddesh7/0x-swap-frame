import {NextResponse} from "next/server";
import axios from "axios";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {sepolia} from "viem/chains";

export async function POST(req: any) {
  const body = await req.json();
  const {takerAddress, buyAmount, sellToken, buyToken} = body;
  // sample body
  // {
  //     "sellToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  //     "buyToken": "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
  //     "sellAmount": "1000",
  //     "takerAddress":"0xb44a29524433dBC639C35124459c741bC241d4f4"
  //   }
  const account = privateKeyToAccount(process.env.PRIVATE_KEY! as any);

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.ALCHEMY_RPC_URL || ""),
  });

  try {
    await axios
      .get(
        `https://sepolia.api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${buyAmount}&takerAddress=${takerAddress}`,
        {
          headers: {
            "0x-api-key": process.env.ZEROX_API_KEY || "",
          },
        }
      )
      .then(async (response) => {
        const request = await walletClient.prepareTransactionRequest({
          to: response.data.to,
          data: response.data.data,
        });

        const hash = await walletClient.sendTransaction(request);
        console.log(hash);
        return new NextResponse(
          JSON.stringify({hash: hash, data: response.data}),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });

    return new NextResponse(JSON.stringify({message: "success"}), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
