'use client'

import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';

type Artwork = {
  id: number;
  title: string;
  image: string;
  description: string;
  artist: string;
  featured?: boolean;
}

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
}

type Workshop = {
  title: string;
  image: string;
  description: string;
  link: string;
}

const artworks: Artwork[] = [
  { id: 1, title: "CottonSketchPen", image: "/wataame.jpeg", description: "わたあめ機は、材料を加熱し液状化したものを高速に回転させ、側面に開けた小さな穴から遠心力によって細い糸を生成する。それが空気中で冷却され、糸が絡まり固まることでわたができる。グルーガンの素材でわたを実現するデバイスを用いた製作物を展示する。わずかな量の素材から大きな形を創り出し、使わなくなったら素材に戻して、また再度別のものを創り出す。こうして、必要な時に必要なものを創り出す世界をつくりたい。", artist: "　", featured: true },
  { id: 2, title: "覗香", image: "/nozoko.jpeg", description: "香道では、香りのする木を燃やさず静かに熱を与えることで香気をそっと立ち昇らせる。この技法を活かして身近な素材に熱を与えることで、鑑賞者は日常では気にもとめない素材の香りを覗きこむ、まさに香りの虫眼鏡のような体験をする。虫たちが日常的に引き寄せられる花の香りが広がる世界を知らない。そこにあるはずの香りを増幅させることで、覗くことができる香り世界に神経を集中させてほしい。", artist: "　" },
  { id: 3, title: "Geocussion", image: "/geocussion.jpeg", description: "Hiroshi Ishiiの『Sandscape』は、コンピューターが誕生するはるか前から、人々は天然の素材を使い、3次元の形状をデザインしてきた歴史を思い起こさせる。古代の都市設計者たちは、粘土や小石、木片を使いながら、都市の景観を描き、自らの身体を通じてその感触を楽しむことで、アイデアを形にしてきた。砂場遊びにおいても、砂を叩き、押し固めることでオブジェクトを作り上げる。そうやって私たちは直感的な触覚体験を通じて創造を楽しんできた。音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音が生まれる。素材に触れ、感覚を通じて表現することの喜びを今一度思い起こしたい。", artist: "　" },
  { id: 4, title: "Puflica", image: "/puf.jpeg", description: "予想のつかない方向にインフレータブル構造物が動く不思議な空間を体感してほしい。", artist: "　" },
  { id: 5, title: "Protophysica", image: "/cap.jpeg", description: "僕らが何かを制作する時、絵の具で色を付けたり、板を切り出したり、テープを貼り付けたりするように、スーパーキャパシタを制作物に取り付ける未来が考えられないだろうか。高速に充放電できるエネルギー貯蔵装置であるスーパーキャパシタ。小型で超軽量なところも素晴らしい。接触によるほんの一瞬の給電で溜め込んだエネルギーを制作物に取り付けることで、新たな制作の可能性が広がるだろう。", artist: "　" },
  { id: 6, title: "Metransfer", image: "/met.jpeg", description: "波打つ液体から泡沫を高速に飛び立たせることで、目の前に立体物を実体化する。そして、一瞬にして消滅させる。このように液体と泡沫を行き来して、次々と異なる立体物として形を現しては崩してを繰り返す、メタモルフォーゼをする。このとめどない変身が多様な律動を刻み心を揺さぶる鼓動感を生みだす。", artist: "　" },
]

const members: Member[] = [
  { id: 1, name: "岡　空来", role: "建築, 空気構造", image: "/members/oka.jpg" },
  { id: 2, name: "金澤政宜", role: "ロボティクス, ヒューマノイドロボット", image: "/members/kanazawa.jpg" },
  { id: 3, name: "中田裕紀", role: "コンピュータサイエンス, 群ロボット", image: "/members/nakata.jpg" },
  { id: 4, name: "南田桂吾", role: "ロボティクス, CV", image: "/members/minamida.jpg" },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1>
            <Link
              href="/"
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-80 transition duration-300"
            >
              4ZIGEN
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#overview" className="text-gray-300 hover:text-white transition duration-300">概要</a></li>
              <li><a href="#workshop" className="text-gray-300 hover:text-white transition duration-300">ワークショップ</a></li>
              <li><a href="#artworks" className="text-gray-300 hover:text-white transition duration-300">作品</a></li>
              <li><a href="#members" className="text-gray-300 hover:text-white transition duration-300">メンバー</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={artworks[currentSlide].image}
              alt={artworks[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                　
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl md:text-2xl"
              >
                東京大学制作展2024
              </motion.p>
            </div>
          </div>
        </section>

        <section id="overview" className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">概要</h2>
          <p className="text-xl">
            私たちは
            <a
              href="https://www.iiiexhibition.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:text-blue-700 underline-offset-4 hover:underline transition duration-300 ease-in-out"
            >
              東京大学制作展2024『付いて離れて』
            </a>
            に作品を出展しました。
          </p>
        </section>

        <section id="workshop" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">ワークショップ</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gray-900">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full mx-auto aspect-video object-contain p-4"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{workshop.title}</h3>
              <p className="text-gray-300 mb-6">{workshop.description}</p>
              <Link
                href={workshop.link}
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
              >
                詳細を見る
              </Link>
            </div>
          </div>
        </section>

        <section id="artworks" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-16">出展作品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-lg shadow-lg ${
                  artwork.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
                    <p className="text-sm">{artwork.artist}</p>
                    {artwork.featured && (
                      <span className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                        注目
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="members" className="bg-gray-900 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">メンバー</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {shuffledMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 4ZIGEN All rights reserved.</p>
          <p className="mt-2">お問い合わせ: <a href="mailto:keigo-minamida@g.ecc.u-tokyo.ac.jp" className="hover:text-white transition duration-300">keigo-minamida@g.ecc.u-tokyo.ac.jp</a></p>
        </div>
      </footer>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="bg-gray-900 text-white">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedArtwork.title}</DialogTitle>
                <DialogDescription className="text-gray-400">{selectedArtwork.artist}</DialogDescription>
              </DialogHeader>
              <img src={selectedArtwork.image} alt={selectedArtwork.title} className="w-full h-64 object-cover rounded-md mb-4" />
              <p className="text-gray-300">{selectedArtwork.description}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}