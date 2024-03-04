import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/input`;
  const imageUrl = `${process.env.NEXT_LOCAL_HOST}/api/image?section=1`;

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
            <meta name="fc:frame:button:1" content="USDT->USDC" />
            <meta name="fc:frame:button:2" content="GRT->USDT" />
            <meta name="fc:frame:button:3" content="UNI->USDT" />
            <meta name="fc:frame:button:4" content="Custom Pair" />
            <meta name="fc:frame:input:text" content="custom: eg. USDT to AXL" />
         
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
