import {Metadata} from "next";

const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/swap`;

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=1`;
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
      "fc:frame:button:1": "USDC->USDT",
      "fc:frame:button:2": "USDT->WMATIC",
      "fc:frame:button:3": "USDT->UNI",
      "fc:frame:button:4": "USDT->USDC",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col text-center lg:p-16">
      <h1>Hello</h1>
    </main>
  );
}
