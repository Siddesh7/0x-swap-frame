import {NextResponse} from "next/server";
import axios from "axios";
import {getTokenPair} from "@/app/lib/constants";

export async function POST(req: any) {
  const {untrustedData} = await req.json();
  const buttonIndex = untrustedData.buttonIndex as number;
  const tokenPair = getTokenPair(buttonIndex);
  if (!tokenPair) {
    const imageURL = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=error`;
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Echo Says:</title>
          <meta property="og:title" content="Echo Says:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame" content="vNext" />
        
          <meta name="fc:frame:image" content="${imageURL}" />
          <meta name="fc:frame:button:1" content="Visit homepage" />
          <meta name="fc:frame:button:1:action" content="link" />
          <meta name="fc:frame:button:1:target" content="https://raise-ez.vercel.app/" />
        
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
  const imageURL = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=2&buyToken=${tokenPair.buyTokenName}&sellToken=${tokenPair.sellTokenName}`;
  //   const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/swap`;
  const postUrl = `https://needed-sensibly-caribou.ngrok-free.app/api/price?buyToken=${tokenPair.buyToken}&sellToken=${tokenPair.sellToken}&buyTokenDecimal=${tokenPair.buyTokenDecimals}&sellTokenDecimal=${tokenPair.sellTokenDecimals}`;

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:image" content="${imageURL}" />
          <meta name="fc:frame:input:text" content="buy quantity. 0.01 / 1 " />
        
          <meta name="fc:frame:button:1" content="Get Quote" />
        
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
