import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radish - Bet on your favorite creators and earn rewards",
  description: "Decentralized prediction markets for creator growth metrics across YouTube, Twitter, TikTok, and Instagram. Place bets on creator growth and rivalry outcomes.",
  keywords: ["prediction markets", "creator economy", "blockchain", "decentralized betting", "social media metrics", "Lens Blockchain", "creator growth"],
  authors: [{ name: "Radish Team" }],
  creator: "Radish",
  publisher: "Radish",
  openGraph: {
    title: "Radish - Bet on your favorite creators and earn rewards",
    description: "Decentralized prediction markets for creator growth metrics across major platforms. Place bets and earn rewards.",
    url: "https://radish-markets.vercel.app",
    siteName: "Radish",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Radish Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radish - Bet on your favorite creators and earn rewards",
    description: "Decentralized prediction markets for creator growth metrics across major platforms. Place bets and earn rewards.",
    images: ["/logo.png"],
    creator: "@radish_bet",
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
