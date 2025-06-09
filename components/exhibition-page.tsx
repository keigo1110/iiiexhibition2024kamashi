'use client'

import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';

type Artwork = {
  id: number;
  title: string;
  image: string;
  description: string;
  artist: string;
  featured?: boolean;
  url?: string;
}

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  url: string;
}

type Workshop = {
  title: string;
  image: string;
  description: string;
  link: string;
}

const artworks: Artwork[] = [
  { id: 1, title: "CottonSketchPen", image: "/wataame.jpeg", description: "わたあめ機は、材料を加熱し液状化したものを高速に回転させ、側面に開けた小さな穴から遠心力によって細い糸を生成する。それが空気中で冷却され、糸が絡まり固まることでわたができる。グルーガンの素材でわたを実現するデバイスを用いた製作物を展示する。わずかな量の素材から大きな形を創り出し、使わなくなったら素材に戻して、また再度別のものを創り出す。こうして、必要な時に必要なものを創り出す世界をつくりたい。", artist: "　", featured: true, url: "https://cotton-sketch-pen-hp.vercel.app/" },
  { id: 2, title: "覗香", image: "/nozoko.jpeg", description: "香道では、香りのする木を燃やさず静かに熱を与えることで香気をそっと立ち昇らせる。この技法を活かして身近な素材に熱を与えることで、鑑賞者は日常では気にもとめない素材の香りを覗きこむ、まさに香りの虫眼鏡のような体験をする。虫たちが日常的に引き寄せられる花の香りが広がる世界を知らない。そこにあるはずの香りを増幅させることで、覗くことができる香り世界に神経を集中させてほしい。", artist: "　", url: "https://nozohp.vercel.app/" },
  { id: 3, title: "Geocussion", image: "/geocussion.jpeg", description: "Hiroshi Ishiiの『Sandscape』は、コンピューターが誕生するはるか前から、人々は天然の素材を使い、3次元の形状をデザインしてきた歴史を思い起こさせる。古代の都市設計者たちは、粘土や小石、木片を使いながら、都市の景観を描き、自らの身体を通じてその感触を楽しむことで、アイデアを形にしてきた。砂場遊びにおいても、砂を叩き、押し固めることでオブジェクトを作り上げる。そうやって私たちは直感的な触覚体験を通じて創造を楽しんできた。音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音が生まれる。素材に触れ、感覚を通じて表現することの喜びを今一度思い起こしたい。", artist: "　", url: "https://geohp.vercel.app/" },
  { id: 4, title: "Puflica", image: "/puf.jpeg", description: "予想のつかない方向にインフレータブル構造物が動く不思議な空間を体感してほしい。", artist: "　", url: "https://puflicahp.vercel.app/" },
  { id: 5, title: "Protophysica", image: "/cap.jpeg", description: "僕らが何かを制作する時、絵の具で色を付けたり、板を切り出したり、テープを貼り付けたりするように、スーパーキャパシタを制作物に取り付ける未来が考えられないだろうか。高速に充放電できるエネルギー貯蔵装置であるスーパーキャパシタ。小型で超軽量なところも素晴らしい。接触によるほんの一瞬の給電で溜め込んだエネルギーを制作物に取り付けることで、新たな制作の可能性が広がるだろう。", artist: "　", url: "https://protophysicahp.vercel.app/" },
  { id: 6, title: "Metransfer", image: "/met.jpeg", description: "波打つ液体から泡沫を高速に飛び立たせることで、目の前に立体物を実体化する。そして、一瞬にして消滅させる。このように液体と泡沫を行き来して、次々と異なる立体物として形を現しては崩してを繰り返す、メタモルフォーゼをする。このとめどない変身が多様な律動を刻み心を揺さぶる鼓動感を生みだす。", artist: "　", url: "https://metransferhp.vercel.app/" },
]

const members: Member[] = [
  { id: 1, name: "岡　空来", role: "建築, 空気構造", image: "/members/oka.jpg", url: "https://sites.google.com/view/soraoka/" },
  { id: 2, name: "金澤政宜", role: "ロボティクス, ヒューマノイドロボット", image: "/members/kanazawa.jpg", url: "https://kanassi.info/" },
  { id: 3, name: "中田裕紀", role: "コンピュータサイエンス, 群ロボット", image: "/members/nakata.jpg", url: "https://yuki-nakata.org/" },
  { id: 4, name: "南田桂吾", role: "ロボティクス, CV", image: "/members/minamida.jpg", url: "https://keigominamida.com/" },
]

const workshop: Workshop = {
  title: "CottonSketchPenワークショップ",
  image: "/teaser.jpg",
  description: "わたあめ機の原理を応用した新しい創作体験をしてみませんか？",
  link: "https://cottonsketchpen.peatix.com/"
}

export function ExhibitionPageComponent() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // メンバーリストをシャッフルして保持
  const shuffledMembers = useMemo(() => {
    return [...members].sort(() => Math.random() - 0.5)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % artworks.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // JSON-LDを拡張（複数のスキーマを組み合わせ）
  const exhibitionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "name": "4ZIGEN | 東京大学制作展2024『付いて離れて』",
    "alternateName": ["4ZIGEN展示", "東京大学制作展2024", "付いて離れて"],
    "description": "4ZIGENによる革新的な作品展示。CottonSketchPen、覗香、Geocussionなど、持続可能な未来を提案する体験型作品を展示します。わたあめ機の原理を応用した新しい創作体験や、香道の技法を活かした香りの虫眼鏡体験など、独創的な作品群をご覧いただけます。",
    "image": [
      "https://iiiexhibition2024kamashi.vercel.app/wataame.jpeg",
      "https://iiiexhibition2024kamashi.vercel.app/nozoko.jpeg",
      "https://iiiexhibition2024kamashi.vercel.app/geocussion.jpeg",
      "https://iiiexhibition2024kamashi.vercel.app/puf.jpeg",
      "https://iiiexhibition2024kamashi.vercel.app/cap.jpeg",
      "https://iiiexhibition2024kamashi.vercel.app/met.jpeg"
    ],
    "url": "https://iiiexhibition2024kamashi.vercel.app",
    "mainEntityOfPage": "https://iiiexhibition2024kamashi.vercel.app",
    "startDate": "2024-12-14",
    "endDate": "2024-12-19",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "東京大学",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "東京",
        "addressCountry": "JP"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "4ZIGEN",
      "url": "https://4zigenhp.vercel.app/",
      "description": "革新的なアート・テクノロジー作品を制作するクリエイティブチーム",
      "knowsAbout": ["アート", "テクノロジー", "インタラクティブデザイン", "持続可能性", "ロボティクス", "建築"],
      "member": shuffledMembers.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "url": member.url,
        "image": `https://iiiexhibition2024kamashi.vercel.app${member.image}`
      }))
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-14",
      "validThrough": "2024-12-19"
    },
    "performer": shuffledMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "url": member.url,
      "knowsAbout": member.role.split(', ')
    })),
    "workFeatured": artworks.map(artwork => ({
      "@type": "CreativeWork",
      "name": artwork.title,
      "description": artwork.description,
      "image": `https://iiiexhibition2024kamashi.vercel.app${artwork.image}`,
      "url": artwork.url || "https://iiiexhibition2024kamashi.vercel.app",
      "creator": {
        "@type": "Organization",
        "name": "4ZIGEN"
      },
      "genre": ["インタラクティブアート", "テクノロジーアート", "体験型アート"],
      "keywords": artwork.title === "CottonSketchPen" ? ["わたあめ機", "3Dペン", "創作ツール", "持続可能性"] :
                   artwork.title === "覗香" ? ["香道", "香り", "感覚体験", "アロマ"] :
                   artwork.title === "Geocussion" ? ["砂", "音響", "触覚", "インタラクション"] :
                   artwork.title === "Puflica" ? ["インフレータブル", "空間体験", "動的構造"] :
                   artwork.title === "Protophysica" ? ["スーパーキャパシタ", "エネルギー", "制作ツール"] :
                   ["液体", "泡沫", "変身", "メタモルフォーゼ"]
    })),
    "about": [
      {
        "@type": "Thing",
        "name": "インタラクティブアート",
        "description": "観客が直接体験できる参加型芸術作品"
      },
      {
        "@type": "Thing",
        "name": "持続可能性",
        "description": "環境に配慮した材料の再利用と循環型制作"
      },
      {
        "@type": "Thing",
        "name": "テクノロジーアート",
        "description": "最新技術を活用した革新的な芸術表現"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": ["アート愛好家", "テクノロジー関係者", "学生", "研究者", "一般来場者"]
    },
    "inLanguage": "ja",
    "isAccessibleForFree": true
  };

  // 組織のJSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "4ZIGEN",
    "alternateName": "4次元",
    "url": "https://4zigenhp.vercel.app/",
    "description": "革新的なアート・テクノロジー作品を制作するクリエイティブチーム。持続可能な未来を提案する体験型作品を通じて、新しい表現の可能性を探求しています。",
    "foundingDate": "2024",
    "knowsAbout": [
      "インタラクティブアート",
      "テクノロジーアート",
      "ロボティクス",
      "建築",
      "持続可能なデザイン",
      "体験型アート",
      "デジタルファブリケーション"
    ],
    "memberOf": {
      "@type": "EducationalOrganization",
      "name": "東京大学"
    },
    "member": shuffledMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "url": member.url,
      "image": `https://iiiexhibition2024kamashi.vercel.app${member.image}`,
      "knowsAbout": member.role.split(', '),
      "memberOf": {
        "@type": "Organization",
        "name": "4ZIGEN"
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "4ZIGEN作品展示",
      "itemListElement": artworks.map((artwork, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "CreativeWork",
          "name": artwork.title,
          "description": artwork.description,
          "image": `https://iiiexhibition2024kamashi.vercel.app${artwork.image}`,
          "url": artwork.url
        },
        "position": index + 1
      }))
    },
    "sameAs": [
      "https://iiiexhibition2024kamashi.vercel.app"
    ]
  };

  // ワークショップのJSON-LD
  const workshopJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": workshop.title,
    "description": workshop.description,
    "image": `https://iiiexhibition2024kamashi.vercel.app${workshop.image}`,
    "url": workshop.link,
    "organizer": {
      "@type": "Organization",
      "name": "4ZIGEN"
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "teaches": [
      "創作技法",
      "わたあめ機の原理",
      "持続可能な制作手法",
      "インタラクティブデザイン"
    ],
    "educationalLevel": "初心者歓迎",
    "inLanguage": "ja"
  };

  // WebSiteのJSON-LD
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "4ZIGEN | 東京大学制作展2024『付いて離れて』",
    "alternateName": "4ZIGEN展示サイト",
    "url": "https://iiiexhibition2024kamashi.vercel.app",
    "description": "4ZIGENが東京大学制作展2024に出展する革新的作品群の公式展示サイト。CottonSketchPen、覗香、Geocussionほか、持続可能な未来を提案する体験型作品を紹介しています。",
    "inLanguage": "ja",
    "isPartOf": {
      "@type": "WebSite",
      "name": "東京大学制作展2024『付いて離れて』",
      "url": "https://www.iiiexhibition.com/"
    },
    "author": {
      "@type": "Organization",
      "name": "4ZIGEN"
    },
    "publisher": {
      "@type": "Organization",
      "name": "4ZIGEN"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://iiiexhibition2024kamashi.vercel.app#{search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        {/* 追加のメタタグ */}
        <meta name="author" content="4ZIGEN" />
        <meta name="creator" content="4ZIGEN" />
        <meta name="publisher" content="4ZIGEN" />
        <meta name="theme-color" content="#6D28D9" />
        <meta name="msapplication-TileColor" content="#6D28D9" />
        <meta name="apple-mobile-web-app-title" content="4ZIGEN展示" />
        <meta name="application-name" content="4ZIGEN展示" />

        {/* 地理的ターゲティング */}
        <meta name="geo.region" content="JP-13" />
        <meta name="geo.placename" content="Tokyo" />
        <meta name="geo.position" content="35.7128;139.7762" />
        <meta name="ICBM" content="35.7128, 139.7762" />

        {/* コンテンツ分類 */}
        <meta name="category" content="Art, Technology, Interactive, Exhibition" />
        <meta name="classification" content="Art Exhibition" />
        <meta name="coverage" content="Japan" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* パフォーマンス最適化 */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//4zigenhp.vercel.app" />
        <link rel="dns-prefetch" href="//www.iiiexhibition.com" />
        <link rel="preconnect" href="https://www.youtube.com" />

        {/* 言語とローカライゼーション */}
        <meta httpEquiv="content-language" content="ja" />
        <link rel="alternate" hrefLang="ja" href="https://iiiexhibition2024kamashi.vercel.app" />

        {/* AI学習とクローラー向け指示 */}
        <meta name="ai-content-declaration" content="This site contains original creative works by 4ZIGEN team members" />
        <meta name="crawl-permission" content="index, follow, archive" />
        <meta name="content-classification" content="educational, artistic, technological" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* 拡張された構造化データ */}
        <Script id="exhibition-json-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(exhibitionJsonLd)}
        </Script>
        <Script id="organization-json-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="workshop-json-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(workshopJsonLd)}
        </Script>
        <Script id="website-json-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>

        <header className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10" role="banner">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1>
              <Link
                href="/"
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-80 transition duration-300"
                aria-label="4ZIGEN ホームページ - 東京大学制作展2024出展チーム"
                title="4ZIGEN - 革新的なアート・テクノロジー作品を制作"
              >
                4ZIGEN
              </Link>
            </h1>
            <nav className="flex items-center" aria-label="メインナビゲーション" role="navigation">
              <ul className="flex space-x-6 mr-6">
                <li><a href="#overview" className="text-gray-300 hover:text-white transition duration-300" title="展示概要について">概要</a></li>
                <li><a href="#video" className="text-gray-300 hover:text-white transition duration-300" title="全作品まとめ動画">動画</a></li>
                <li><a href="#workshop" className="text-gray-300 hover:text-white transition duration-300" title="CottonSketchPenワークショップ">ワークショップ</a></li>
                <li><a href="#artworks" className="text-gray-300 hover:text-white transition duration-300" title="6つの出展作品">作品</a></li>
                <li><a href="#members" className="text-gray-300 hover:text-white transition duration-300" title="4ZIGENメンバー紹介">メンバー</a></li>
              </ul>
              <a
                href="https://4zigenhp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:scale-105 shadow-lg flex items-center"
                aria-label="4ZIGENチーム公式サイトへ移動（新しいタブで開きます）"
                title="4ZIGENチーム公式サイト"
              >
                <span>チームサイト</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </nav>
          </div>
        </header>

        <main className="pt-24" role="main">
          <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="メインビジュアル">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentSlide}
                src={artworks[currentSlide].image}
                alt={`${artworks[currentSlide].title} - 4ZIGEN作品展示のメイン画像`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                loading="eager"
                decoding="async"
                itemProp="image"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-5xl md:text-7xl font-bold mb-4"
                  itemProp="name"
                >
                  　
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-xl md:text-2xl"
                  itemProp="description"
                >
                  東京大学制作展2024
                </motion.p>
              </div>
            </div>
          </section>

          <section id="overview" className="container mx-auto px-4 py-16 text-center" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-3xl font-bold mb-8">概要</h2>
            <p className="text-xl" itemProp="description">
              私たちは
              <a
                href="https://www.iiiexhibition.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-semibold hover:text-blue-700 underline-offset-4 hover:underline transition duration-300 ease-in-out"
                title="東京大学制作展2024『付いて離れて』公式サイト"
                aria-label="東京大学制作展2024『付いて離れて』公式サイトへ移動（新しいタブで開きます）"
              >
                東京大学制作展2024『付いて離れて』
              </a>
              に作品を出展しました。
            </p>
          </section>

          <section id="video" className="container mx-auto px-4 py-16 text-center" aria-labelledby="video-heading">
            <h2 id="video-heading" className="text-3xl font-bold mb-8">全作品まとめ動画</h2>
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/8nh0nSSK2EM"
                title="4ZIGEN全作品まとめ動画 - 東京大学制作展2024出展作品"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                aria-label="4ZIGENの全作品を紹介するYouTube動画"
              ></iframe>
            </div>
          </section>

          <section id="workshop" className="container mx-auto px-4 py-16" aria-labelledby="workshop-heading">
            <h2 id="workshop-heading" className="text-3xl font-bold text-center mb-8">ワークショップ</h2>
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg" itemScope itemType="https://schema.org/EducationEvent">
              <div className="bg-gray-900">
                <img
                  src={workshop.image}
                  alt={`${workshop.title} - わたあめ機の原理を応用した創作体験ワークショップ`}
                  className="w-full mx-auto aspect-video object-contain p-4"
                  loading="lazy"
                  width={800}
                  height={450}
                  itemProp="image"
                  decoding="async"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4" itemProp="name">{workshop.title}</h3>
                <p className="text-gray-300 mb-6" itemProp="description">{workshop.description}</p>
                <Link
                  href={workshop.link}
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CottonSketchPenワークショップの詳細とお申し込み（新しいタブで開きます）"
                  title="Peatixでワークショップの詳細を確認"
                  itemProp="url"
                >
                  詳細を見る
                </Link>
              </div>
            </article>
          </section>

          <section id="artworks" className="container mx-auto px-4 py-16" aria-labelledby="artworks-heading">
            <h2 id="artworks-heading" className="text-4xl font-bold text-center mb-16">出展作品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" role="group" aria-label="4ZIGEN出展作品一覧">
              {artworks.map((artwork, index) => (
                <motion.article
                  key={artwork.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${
                    artwork.featured ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelectedArtwork(artwork)}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                  role="button"
                  tabIndex={0}
                  aria-label={`${artwork.title}の詳細を表示`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedArtwork(artwork);
                    }
                  }}
                >
                  <div className={`relative ${artwork.featured ? 'aspect-[4/3]' : 'aspect-[3/2]'} w-full`}>
                    <img
                      src={artwork.image}
                      alt={`${artwork.title} - ${artwork.description.substring(0, 100)}...`}
                      className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-110"
                      loading={index < 3 ? "eager" : "lazy"}
                      width={500}
                      height={300}
                      itemProp="image"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold mb-2" itemProp="name">{artwork.title}</h3>
                        <p className="text-sm mb-4" itemProp="creator">{artwork.artist}</p>
                        {artwork.featured && (
                          <span className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                            注目
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <meta itemProp="description" content={artwork.description} />
                  <meta itemProp="url" content={artwork.url || "https://iiiexhibition2024kamashi.vercel.app"} />
                </motion.article>
              ))}
            </div>
          </section>

          <section id="members" className="bg-gray-900 py-24" aria-labelledby="members-heading">
            <div className="container mx-auto px-4">
              <h2 id="members-heading" className="text-4xl font-bold text-center mb-16">メンバー</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" role="group" aria-label="4ZIGENメンバー一覧">
                {shuffledMembers.map((member, index) => (
                  <motion.article
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${member.name}の個人サイトへ移動（新しいタブで開きます）`}
                      title={`${member.name} - ${member.role}`}
                    >
                      <img
                        src={member.image}
                        alt={`${member.name} - 4ZIGENメンバー（専門：${member.role}）`}
                        className="w-full h-64 object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                        width={300}
                        height={300}
                        itemProp="image"
                        decoding="async"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2" itemProp="name">{member.name}</h3>
                        <p className="text-gray-400" itemProp="jobTitle">{member.role}</p>
                        <meta itemProp="url" content={member.url} />
                        <meta itemProp="memberOf" content="4ZIGEN" />
                      </div>
                    </a>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-black text-gray-400 py-12" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            <p className="text-center">&copy; {new Date().getFullYear()} 4ZIGEN All rights reserved.</p>
            <p className="mt-2">お問い合わせ: <a href="mailto:kamashigsii@gmail.com" className="hover:text-white transition duration-300" aria-label="メールでお問い合わせ" title="4ZIGENへのお問い合わせメール">kamashigsii@gmail.com</a></p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="https://4zigenhp.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300" title="4ZIGENチーム公式サイト">チームサイト</a>
              <a href="https://www.iiiexhibition.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300" title="東京大学制作展2024公式サイト">制作展公式</a>
            </div>
          </div>
        </footer>

        <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
          <DialogContent className="bg-gray-900 text-white max-w-4xl" role="dialog" aria-labelledby="artwork-dialog-title">
            {selectedArtwork && (
              <>
                <DialogHeader>
                  <DialogTitle id="artwork-dialog-title" className="text-2xl font-bold">{selectedArtwork.title}</DialogTitle>
                  <DialogDescription className="text-gray-400">{selectedArtwork.artist}</DialogDescription>
                </DialogHeader>
                <img
                  src={selectedArtwork.image}
                  alt={`${selectedArtwork.title} - 詳細画像`}
                  className="w-full h-64 object-cover rounded-md mb-4"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-gray-300 mb-6">{selectedArtwork.description}</p>

                {/* モーダル内の詳細を見るボタン */}
                {selectedArtwork.url && (
                  <div className="flex justify-center">
                    <Link
                      href={selectedArtwork.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-3 px-8 rounded-lg font-medium transition duration-300 transform hover:scale-105 shadow-lg"
                      aria-label={`${selectedArtwork.title}の公式ページを新しいタブで開く`}
                      title={`${selectedArtwork.title}公式ページ`}
                    >
                      詳細を見る
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}