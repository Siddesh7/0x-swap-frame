import {NextResponse} from "next/server";
import axios from "axios";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {polygon} from "viem/chains";
import {ABI, ADDRESS} from "@/app/lib/constants";
import {getAddressForFid} from "frames.js";

export async function POST(req: any) {
  const searchParams = req.nextUrl.searchParams;
  const buyAmount = searchParams.get("buyAmount") ?? "";
  const buyToken = searchParams.get("buyToken") ?? "";
  const sellToken = searchParams.get("sellToken") ?? "";

  if (!sellToken || !buyToken || !buyAmount) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_HOST}/api/image?section=error" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST}/api/image?section=error" />
         
        </head>
        <body/>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }

  const {
    untrustedData: {fid},
  } = await req.json();

  const address = await getAddressForFid({
    fid,
    options: {fallbackToCustodyAddress: true},
  });
  const account = privateKeyToAccount(process.env.PRIVATE_KEY! as any);

  const walletClient = createWalletClient({
    account,
    chain: polygon,
    transport: http(process.env.ALCHEMY_RPC_URL || ""),
  });

  try {
    const response: any = await axios.get(
      `https://polygon.api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${buyAmount}`,
      {
        headers: {
          "0x-api-key": process.env.ZEROX_API_KEY || "",
        },
      }
    );
    let adjustedBuyAmount = Number(response.data.sellAmount) * 1.05;
    console.log("response", response.data.sellAmount);
    walletClient.writeContract({
      account,
      address: ADDRESS,
      abi: ABI,
      functionName: "fillQuote",
      args: [
        response.data.sellTokenAddress,
        response.data.buyTokenAddress,
        response.data.allowanceTarget,
        response.data.to,
        response.data.data,
        adjustedBuyAmount.toFixed(0),
        address,
      ],
    });

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${process.env.NEXT_LOCAL_HOST}/api/image?section=4" />
          <meta name="fc:frame" content="vNext" />    
          <meta name="fc:frame:image" content="${process.env.NEXT_LOCAL_HOST}/api/image?section=4" />
          <meta name="fc:frame:button:1" content="Show in Polygonscan" />
          <meta name="fc:frame:button:1:action" content="link" />
          <meta name="fc:frame:button:1:target" content=https://polygonscan.com/address/${address} />
          <meta name="fc:frame:button:2:action" content="post" />
          <meta name="fc:frame:button:2:target" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
         <meta name="fc:frame:button:2" content="Start Again" />       
        </head>
        <body/>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_HOST}/api/image?section=error" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST}/api/image?section=error" />
         
        </head>
        <body/>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }
}
