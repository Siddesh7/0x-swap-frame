import {Metadata} from "next";
const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/input`;
const imageUrl = `${process.env.NEXT_LOCAL_HOST}/api/image?section=1`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "frameSwap",
    description: "Swap within warpcast!",
    openGraph: {
      title: "frameSwap",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:button:1": "USDT->USDC",
      "fc:frame:button:2": "GRT->USDT",
      "fc:frame:button:3": "UNI->USDT",
      "fc:frame:button:4": "Custom pair",
      "fc:frame:input:text": "custom: eg. USDT to USDC",
    },
  };
}

export default function Home() {
  return <main className="flex flex-col text-center lg:p-4">hi</main>;
}
