import {NextRequest, NextResponse} from "next/server";
import {getSSLHubRpcClient, Message} from "@farcaster/hub-nodejs";
import axios from "axios";
import {getTokenName} from "@/app/lib/constants";
import {getAddressForFid} from "frames.js";

const HUB_URL = "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const buyToken = searchParams.get("buyToken") ?? "NULL";
  const sellToken = searchParams.get("sellToken") ?? "NULL";
  const buyTokenDecimal: any = searchParams.get("buyTokenDecimal") ?? 18;
  const sellTokenDecimal = searchParams.get("sellTokenDecimal") ?? 18;

  const {
    untrustedData: {inputText},
  } = await req.json();

  const message = inputText ?? "";

  if (message === "") {
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
  const buyAmount: number = Number(message) * 10 ** buyTokenDecimal;
  let imageUrl;
  let postUrl;
  await axios
    .get(
      `https://polygon.api.0x.org/swap/v1/price?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${buyAmount}`,
      {
        headers: {
          "0x-api-key": process.env.ZEROX_API_KEY || "",
        },
      }
    )
    .then(async (response) => {
      const sellTokenName = getTokenName(sellToken);
      const buyTokenName = getTokenName(buyToken);
      imageUrl = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=3&buyToken=${buyTokenName}&sellToken=${sellTokenName}&buyAmount=${response.data.buyAmount}&sellAmount=${response.data.sellAmount}&buyTokenDecimal=${buyTokenDecimal}&sellTokenDecimal=${sellTokenDecimal}`;
      // postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/execute?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${response.data.buyAmount}`;
      postUrl = `https://needed-sensibly-caribou.ngrok-free.app/api/execute?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${response.data.buyAmount}`;
    });

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:image" content="${imageUrl}" />
            <meta name="fc:frame:button:1" content="Swap" />
         
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

export const GET = POST;
