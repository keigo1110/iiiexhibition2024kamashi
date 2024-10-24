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
  title: "CottonSketchPenチーム",
  description:
    "CottonSketchPenは、プラスチックボトルなどの廃棄物をその場でコットン状の素材に変えるポータブルデバイスです。持ち運びに便利で、環境に優しい持続可能な製品を提供し、旅行時の衣類や梱包材の悩みを解決します。",
  openGraph: {
    title: "CottonSketchPenチーム",
    description:
      "CottonSketchPenは、プラスチックボトルなどの廃棄物をその場でコットン状の素材に変えるポータブルデバイスです。",
    url: "https://iiiexhibition2024kamashi.vercel.app",
    images: [
      {
        url: "/public/wataame.jpeg",
        width: 800,
        height: 600,
        alt: "CottonSketchPenデバイスの画像",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // OGP画像のデフォルトURL
  const defaultImageUrl = "/default-image.jpg";

  // OGP画像のURLを取得
  const ogImageUrl = metadata.openGraph?.images?.[0]?.url ?? defaultImageUrl;

  return (
    <html lang="ja">
      <head>
        <meta
          name="description"
          content={metadata.description ?? "デフォルトの説明"}
        />
        <meta property="og:title" content={metadata.openGraph?.title ?? "デフォルトのタイトル"} />
        <meta property="og:description" content={metadata.openGraph?.description ?? "デフォルトの説明"} />
        <meta property="og:url" content={metadata.openGraph?.url ?? "https://example.com"} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <link rel="icon" href={metadata.icons?.icon ?? "/favicon.ico"} />
        <title>{metadata.title ?? "デフォルトのタイトル"}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}