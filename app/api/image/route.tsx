import {NextRequest} from "next/server";
import {ImageResponse} from "next/og";
import {supportedTokens} from "@/app/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section") ?? "1";
  const swapObject = {
    fromToken: searchParams.get("sellToken") ?? "NULL",
    toToken: searchParams.get("buyToken") ?? "NULL",
    sellAmount: searchParams.get("sellAmount") ?? "0",
    buyAmount: searchParams.get("buyAmount") ?? "0",
    buyTokenDecimals: searchParams.get("buyTokenDecimal") ?? "0",
    sellTokenDecimals: searchParams.get("sellTokenDecimal") ?? "0",
  };
  const message = searchParams.get("message") ?? "NULL";
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1528px", // Set width to 1528px
          height: "800px", // Set height to 800px
          background: "linear-gradient(to right, #432889, #17101F)", // Add background gradient
          position: "relative",
        }}
      >
        {getSection(section, swapObject, message)}
      </div>
    ),
    {
      width: 1528, // Match these dimensions to your image's dimensions
      height: 800,
    }
  );
}

const getSection = (section: string, text?: any, message?: any) => {
  switch (section) {
    case "1":
      return (
        <div
          style={{
            fontSize: "60px",
            padding: "0 200px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>
            Now Swap directly from Warpcast with few clicks! Powered by 0x Swap
            API.
          </span>
          <p style={{fontSize: "40px"}}>
            Supported Tokens: ${Object.keys(supportedTokens).join(", $")}
          </p>
        </div>
      );

    case "2":
      return (
        <div
          style={{
            fontSize: "80px",
            padding: "0 200px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <span style={{fontSize: "100px"}}>You are now swapping</span>
          <span style={{color: "yellow"}}>
            ${text.fromToken} {"->"} ${text.toToken}
          </span>
          <span>Fill in the buy amount.</span>
        </div>
      );

    case "3":
      return (
        <div
          style={{
            fontSize: "60px",
            padding: "0 200px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <span style={{fontSize: "100px"}}>You are Swapping </span>
          <span
            style={{
              color: "yellow",

              padding: "25px",
              borderRadius: "25px",
            }}
          >
            {text.sellAmount / 10 ** text.sellTokenDecimals} ${text.fromToken}{" "}
            {"->"} {text.buyAmount / 10 ** text.buyTokenDecimals} $
            {text.toToken}
          </span>
          <span>Click proceed to swap.</span>
        </div>
      );
    case "4":
      return (
        <div
          style={{
            fontSize: "80px",
            padding: "0 200px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Swap tx sent!</span>
          <span>Check your wallet or check in polygonscan.</span>
        </div>
      );
    case "error":
      return (
        <div
          style={{
            fontSize: "80px",
            padding: "0 200px",
            textAlign: "center",
            color: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <span>Something went wrong! Try again</span>
          <span>{message}</span>
        </div>
      );

    default:
      <div
        style={{
          fontSize: "60px",
          padding: "0 200px",
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          {" "}
          Now Swap directly from Warpcast with few clicks! Powered by 0x Swap
          API.
        </span>
      </div>;
      break;
  }
};
