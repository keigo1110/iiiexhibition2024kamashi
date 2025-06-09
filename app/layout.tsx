import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6D28D9',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://iiiexhibition2024kamashi.vercel.app'),
  title: {
    default: "4ZIGEN | 東京大学制作展2024『付いて離れて』",
    template: "%s | 4ZIGEN"
  },
  description:
    "4ZIGENは東京大学制作展2024『付いて離れて』に参加。CottonSketchPen、覗香、Geocussion、Puflica、Protophysica、Metransferなど革新的な作品を展示。廃棄物の再利用、インタラクティブな体験を通じて持続可能な未来を提案します。わたあめ機の原理を応用した創作ツール、香道技法による香りの虫眼鏡体験、砂を使った直感的音響装置など、独創的な6作品をご紹介。",
  keywords: [
    "4ZIGEN", "東京大学制作展", "CottonSketchPen", "アート", "テクノロジー", "インタラクティブ",
    "持続可能性", "わたあめ機", "展示会", "覗香", "Geocussion", "Puflica", "Protophysica", "Metransfer",
    "体験型アート", "ロボティクス", "建築", "インスタレーション", "デジタルアート", "メディアアート",
    "東京大学", "付いて離れて", "制作展2024", "学生作品", "クリエイティブ", "イノベーション",
    "エコロジー", "リサイクル", "循環型デザイン", "感覚体験", "触覚", "嗅覚", "聴覚", "視覚",
    "AI", "機械学習", "コンピュータビジョン", "ヒューマンコンピュータインタラクション"
  ],
  authors: [
    { name: "4ZIGEN" },
    { name: "岡　空来", url: "https://sites.google.com/view/soraoka/" },
    { name: "金澤政宜", url: "https://kanassi.info/" },
    { name: "中田裕紀", url: "https://yuki-nakata.org/" },
    { name: "南田桂吾", url: "https://keigominamida.com/" }
  ],
  creator: "4ZIGEN",
  publisher: "4ZIGEN",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION_ID || '',
    }
  },
  category: 'Art & Technology Exhibition',
  classification: 'Educational Art Exhibition',
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "4ZIGEN | 東京大学制作展2024『付いて離れて』革新的作品展示",
    description:
      "4ZIGENが東京大学制作展2024に出展する革新的作品群のご紹介。CottonSketchPen、覗香、Geocussionほか6作品を通じて、持続可能な未来を提案する体験型アートをお楽しみください。わたあめ機原理の創作ツールから香りの虫眼鏡体験まで、独創的な技術とアートの融合をご体験いただけます。",
    url: "https://iiiexhibition2024kamashi.vercel.app",
    siteName: "4ZIGEN",
    countryName: "Japan",
    images: [
      {
        url: "https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg",
        width: 1200,
        height: 630,
        alt: "CottonSketchPen - わたあめ機の原理を応用した革新的創作ツール",
        type: "image/jpeg",
      },
      {
        url: "https://iiiexhibition2024kamashi.vercel.app/nozoko.jpeg",
        width: 1200,
        height: 630,
        alt: "覗香 - 香道技法を活かした香りの虫眼鏡体験",
        type: "image/jpeg",
      },
      {
        url: "https://iiiexhibition2024kamashi.vercel.app/geocussion.jpeg",
        width: 1200,
        height: 630,
        alt: "Geocussion - 砂を使った直感的音響体験装置",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@4ZIGEN_art",
    creator: "@4ZIGEN_art",
    title: "4ZIGEN | 東京大学制作展2024『付いて離れて』",
    description:
      "4ZIGENが東京大学制作展に出展する革新的作品群。CottonSketchPen、覗香、Geocussionなど6作品を通じて持続可能な未来を提案。わたあめ機原理の創作ツールから香りの虫眼鏡体験まで体感できます。",
    images: [
      {
        url: "https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg",
        alt: "4ZIGEN作品展示 - CottonSketchPen"
      }
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://iiiexhibition2024kamashi.vercel.app",
    languages: {
      'ja-JP': 'https://iiiexhibition2024kamashi.vercel.app',
    }
  },
  other: {
    'msapplication-TileColor': '#6D28D9',
    'apple-mobile-web-app-title': '4ZIGEN展示',
    'application-name': '4ZIGEN展示',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
    // 地理的メタデータ
    'geo.region': 'JP-13',
    'geo.placename': 'Tokyo',
    'geo.position': '35.7128;139.7762',
    'ICBM': '35.7128, 139.7762',
    // コンテンツ分類
    'category': 'Art, Technology, Interactive, Exhibition',
    'classification': 'Art Exhibition',
    'coverage': 'Japan',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '7 days',
    // AI学習対応
    'ai-content-declaration': 'This site contains original creative works by 4ZIGEN team members',
    'crawl-permission': 'index, follow, archive',
    'content-classification': 'educational, artistic, technological'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" prefix="og: http://ogp.me/ns#">
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//4zigenhp.vercel.app" />
        <link rel="dns-prefetch" href="//www.iiiexhibition.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="" />

        {/* 追加のSEOメタタグ */}
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta httpEquiv="content-language" content="ja" />
        <meta name="language" content="Japanese" />
        <link rel="alternate" hrefLang="ja" href="https://iiiexhibition2024kamashi.vercel.app" />

        {/* Rich Snippets support */}
        <meta property="article:author" content="4ZIGEN" />
        <meta property="article:publisher" content="4ZIGEN" />
        <meta property="article:section" content="Art & Technology" />
        <meta property="article:tag" content="Interactive Art, Technology Art, Exhibition" />

        {/* Schema.org markup for Google */}
        <meta itemProp="name" content="4ZIGEN | 東京大学制作展2024『付いて離れて』" />
        <meta itemProp="description" content="4ZIGENが東京大学制作展2024に出展する革新的作品群" />
        <meta itemProp="image" content="https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {children}
      </body>
    </html>
  );
}