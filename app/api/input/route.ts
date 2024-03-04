import {NextResponse} from "next/server";
import axios from "axios";
import {
  getTokenAddress,
  getTokenPair,
  supportedTokens,
} from "@/app/lib/constants";

export async function POST(req: any) {
  const {
    untrustedData: {buttonIndex, inputText},
  } = await req.json();

  const tokenPair = getTokenPair(buttonIndex);
  if (buttonIndex === 1 || buttonIndex === 2 || buttonIndex === 3) {
    if (!tokenPair || tokenPair === null) {
      const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Invalid%20token%20pair`;

      return new NextResponse(
        `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame" content="vNext" />
              <meta name="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
          <meta name="fc:frame:image" content="${imageURL}" />
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
    } else {
      const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=2&buyToken=${tokenPair.buyTokenName}&sellToken=${tokenPair.sellTokenName}`;
      const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/price?buyToken=${tokenPair.buyToken}&sellToken=${tokenPair.sellToken}&buyTokenDecimal=${tokenPair.buyTokenDecimals}&sellTokenDecimal=${tokenPair.sellTokenDecimals}`;

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
          <meta name="fc:frame:button:2:action" content="post" />
          <meta name="fc:frame:button:2:target" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
          
                 <meta name="fc:frame:button:2" content="Go back" />
        
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

  if (buttonIndex === 4) {
    if (!inputText.includes(" to ")) {
      const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Invalid token pair`;
      const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/frame`;
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

    const [sellToken, buyToken] = inputText.split(" to ");
    const buyTokenPair = getTokenAddress(buyToken);
    const sellTokenPair = getTokenAddress(sellToken);

    if (!buyTokenPair || !sellTokenPair) {
      const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Token%20pair%20not%20supported`;
      const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/frame`;
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

    const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=2&buyToken=${buyToken}&sellToken=${sellToken}`;
    const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/price?buyToken=${buyTokenPair.address}&sellToken=${sellTokenPair.address}&buyTokenDecimal=${buyTokenPair.decimals}&sellTokenDecimal=${sellTokenPair.decimals}`;

    console.log("imageURL", imageURL);
    console.log("postUrl", postUrl);

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
          <meta name="fc:frame:button:2:action" content="post" />
          <meta name="fc:frame:button:2:target" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
          
                 <meta name="fc:frame:button:2" content="Go back" />
        
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

  const imageURL = `${process.env.NEXT_LOCAL_HOST}/api/image?section=error&message=Invalid%20token%20pair`;

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame" content="vNext" />
              <meta name="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
          <meta name="fc:frame:image" content="${imageURL}" />
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
