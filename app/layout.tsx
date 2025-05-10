import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "4ZIGEN | 東京大学制作展2024『付いて離れて』",
  description:
    "4ZIGENは東京大学制作展2024『付いて離れて』に参加。CottonSketchPen、覗香、Geocussion、Puflica、Protophysica、Metransferなど革新的な作品を展示。廃棄物の再利用、インタラクティブな体験を通じて持続可能な未来を提案します。",
  keywords: ["4ZIGEN", "東京大学制作展", "CottonSketchPen", "アート", "テクノロジー", "インタラクティブ", "持続可能性", "わたあめ機", "展示会"],
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "4ZIGEN | 東京大学制作展2024『付いて離れて』作品展示",
    description:
      "4ZIGENが東京大学制作展2024に出展する革新的作品群のご紹介。CottonSketchPen、覗香、Geocussionほか、持続可能な未来を提案する体験型作品を展示します。",
    url: "https://iiiexhibition2024kamashi.vercel.app",
    siteName: "4ZIGEN",
    images: [{
      url: "https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg",
      width: 1200,
      height: 630,
      alt: "4ZIGEN作品展示",
      type: "image/jpeg",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "4ZIGEN | 東京大学制作展2024",
    description:
      "4ZIGENが東京大学制作展に出展する革新的作品群のご紹介。持続可能な未来を提案する体験型作品を展示します。",
    images: ["https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://iiiexhibition2024kamashi.vercel.app",
  },
  themeColor: "#6D28D9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}