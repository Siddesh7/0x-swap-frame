import {NextResponse} from "next/server";
import axios from "axios";

export async function GET(req: any) {
  const searchParams = req.nextUrl.searchParams;
  const buyAmount = searchParams.get("buyAmount") ?? "";
  const buyToken = searchParams.get("buyToken") ?? "";
  const sellToken = searchParams.get("sellToken") ?? "";
  try {
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
        console.log(response.data);

        return new NextResponse(
          JSON.stringify({hash: "hash", data: response.data}),
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
