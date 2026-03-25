"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import CharacterCard from "@/components/CharacterCard";
import { charactersData, Character } from "@/data/mockData";
import { Sparkles, SpaceIcon as Calendar, Gift, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = useState<{ anime: Character[], celebrity: Character[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (day: string, month: string) => {
    setIsSearching(true);
    setResults(null);
    const searchDate = `${day}/${month}`;
    
    // 1. Anime Characters (from internal DB as Anime APIs don't support robust date querying)
    const animeMatches = charactersData.filter(char => char.birthDate === searchDate && char.type === "anime");
    let fallbackCelebrities = charactersData.filter(char => char.birthDate === searchDate && char.type === "celebrity");

    // 2. Wikipedia On This Day API (for Celebrities)
    try {
      const res = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/vi/onthisday/births/${month}/${day}`);
      if (!res.ok) {
        // Fallback to English Wikipedia if Vietnamese has insufficient data
        const enRes = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`);
        if (!enRes.ok) throw new Error("Wiki API Error");
        
        const data = await enRes.json();
        const wikiCelebrities: Character[] = data.births
          .map((b: any, i: number) => {
            const page = b.pages?.[0];
            return {
              id: `wiki-en-${i}`,
              name: page?.title || b.text,
              birthDate: searchDate,
              image: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
              series: `Sinh năm ${b.year}`,
              description: page?.extract || page?.description || b.text,
              type: 'celebrity'
            };
          })
          .filter((c: any) => c.image && !c.image.includes("Wikipedia-logo"));

        fallbackCelebrities = [...fallbackCelebrities, ...wikiCelebrities];
      } else {
        const data = await res.json();
        const wikiCelebrities: Character[] = data.births
          .map((b: any, i: number) => {
            const page = b.pages?.[0];
            return {
              id: `wiki-vi-${i}`,
              name: page?.title || b.text,
              birthDate: searchDate,
              image: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
              series: `Năm ${b.year}`,
              description: page?.extract || page?.description || b.text,
              type: 'celebrity'
            };
          })
          .filter((c: any) => c.image && !c.image.includes("Wikipedia-logo"));

        if (wikiCelebrities.length > 0) {
          fallbackCelebrities = [...fallbackCelebrities, ...wikiCelebrities];
        } else {
          throw new Error("Empty VI data");
        }
      }
    } catch (err) {
      console.warn("Failed to fetch Wikipedia API, using local mock data.");
    } finally {
      // De-duplicate by name and Limit to 30 to not overwhelm UI
      const uniqueCelebrities = Array.from(new Map(fallbackCelebrities.map(item => [item.name, item])).values());
      const selectedCelebrities = uniqueCelebrities.slice(0, 15);
      
      setResults({ 
        anime: animeMatches, 
        celebrity: selectedCelebrities 
      });
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-pastel-cream overflow-hidden font-quicksand pb-20 relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pastel-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16 flex flex-col items-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-white/80 backdrop-blur px-6 py-2 rounded-full border border-pastel-pink mb-6 shadow-sm">
            <span className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-sm">
              <Sparkles size={16} /> Welcome to Birthday Universe <Sparkles size={16} />
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
            Hôm Nay Là <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pastel-blue">Sinh Nhật</span> Ai?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Khám phá những nhân vật anime huyền thoại và vĩ nhân thế giới chia sẻ cùng ngày sinh với bạn!
          </p>
        </motion.div>

        <div className="w-full max-w-lg mb-12">
          <SearchForm onSearch={handleSearch} />
          
          {isSearching && (
            <div className="mt-8 flex flex-col items-center justify-center text-pastel-blue drop-shadow-sm">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold tracking-widest uppercase animate-pulse">Đang Lục Tìm Trong Bách Khoa Toàn Thư Wikipedia...</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-20 w-full px-4">
          <Link href="/create-countdown" className="bg-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 font-bold text-gray-700 hover:scale-105 transition-transform border border-gray-100 w-full sm:w-auto justify-center">
            <Calendar size={24} className="text-pastel-blue" />
            Tạo Đếm Ngược
          </Link>
          <Link href="/create-gift" className="bg-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 font-bold text-gray-700 hover:scale-105 transition-transform border border-gray-100 w-full sm:w-auto justify-center">
            <Gift size={24} className="text-pastel-pink" />
            Tạo Quà Ảo Đám Mây
          </Link>
        </div>

        <AnimatePresence>
          {results && !isSearching && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {results.anime.length === 0 && results.celebrity.length === 0 ? (
                <div className="text-center bg-white/50 p-10 rounded-[2rem] border border-dashed border-gray-300 max-w-lg mx-auto">
                  <p className="text-xl text-gray-600 font-medium">
                    Oops! Hiện chưa có dữ liệu nhân vật nào sinh vào ngày này trong vũ trụ của chúng ta. 🛸
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 w-full">
                  {results.anime.length > 0 && (
                     <section className="flex flex-col items-center">
                       <div className="bg-pastel-pink/20 px-8 py-3 rounded-full mb-8">
                         <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                           🌟 Anime
                         </h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                         {results.anime.map(char => <CharacterCard key={char.id} character={char} />)}
                       </div>
                     </section>
                  )}
                  {results.celebrity.length > 0 && (
                     <section className="flex flex-col items-center">
                       <div className="bg-pastel-blue/20 px-8 py-3 rounded-full mb-8">
                         <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                           🌎 Từ Bách Khoa Toàn Thư (Wikipedia)
                         </h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                         {results.celebrity.map(char => <CharacterCard key={char.id} character={char} />)}
                       </div>
                     </section>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}