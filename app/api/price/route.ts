import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {getTokenName} from "@/app/lib/constants";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const buyToken = searchParams.get("buyToken") ?? "NULL";
  const sellToken = searchParams.get("sellToken") ?? "NULL";
  const buyTokenDecimal: any = searchParams.get("buyTokenDecimal") ?? 18;
  const sellTokenDecimal = searchParams.get("sellTokenDecimal") ?? 18;

  const {
    untrustedData: {inputText},
  } = await req.json();

  if (inputText.length === 0) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Please%20a%20valid%20quantity" />
          <meta name="fc:frame" content="vNext" />
                <meta name="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
          <meta name="fc:frame:image" content="${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Please%20a%20valid%20quantity" />
          <meta name="fc:frame:button:1" content="Go back" />
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
  const buyAmount: number = Number(inputText) * 10 ** buyTokenDecimal;

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
      console.log("response", response.data);
      imageUrl = `${process.env.NEXT_LOCAL_HOST}/api/image?section=3&buyToken=${buyTokenName}&sellToken=${sellTokenName}&buyAmount=${response.data.buyAmount}&sellAmount=${response.data.sellAmount}&buyTokenDecimal=${buyTokenDecimal}&sellTokenDecimal=${sellTokenDecimal}`;
      postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/execute?buyToken=${buyToken}&sellToken=${sellToken}&buyAmount=${response.data.buyAmount}`;
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
}

export const GET = POST;
