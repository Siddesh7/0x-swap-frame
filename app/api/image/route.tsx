import {NextRequest} from "next/server";
import {ImageResponse} from "next/og";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section") ?? "1";
  const swapObject = {
    fromToken: searchParams.get("fromToken") ?? "NULL",
    toToken: searchParams.get("toToken") ?? "NULL",
    sellAmount: searchParams.get("sellAmount") ?? "0",
    buyAmount: searchParams.get("buyAmount") ?? "0",
  };
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
          background: "linear-gradient(to right, #00f260, #00e5ff)", // Add background gradient
          position: "relative",
        }}
      >
        {getSection(section, swapObject)}
        <img
          src={`${process.env.NEXT_PUBLIC_HOST}/0xlogo.png`}
          alt=""
          style={{position: "absolute", bottom: "0", left: "450"}}
          width={"600px"}
        />
      </div>
    ),
    {
      width: 1528, // Match these dimensions to your image's dimensions
      height: 800,
    }
  );
}

const getSection = (section: string, text?: any) => {
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
            {" "}
            Now Swap directly from Warpcast with few clicks! Powered by 0x Swap
            API.
          </span>
        </div>
      );

    case "2":
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
          <span>You are now swapping</span>
          <span style={{color: "black"}}>
            ${text.fromToken} to ${text.toToken}
          </span>
          <span>Fill in the buy amount in the field below.</span>
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
          }}
        >
          <span>You are spending </span>
          <span
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "25px",
              borderRadius: "25px",
            }}
          >
            {text.sellAmount} ${text.fromToken} to buy ${text.buyAmount}{" "}
            {text.toToken}
          </span>
          <span>Click proceed to swap.</span>
        </div>
      );
    case "4":
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
          <span>Swap tx sent!</span>
          <span>Check your wallet or check in polygonscan.</span>
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
