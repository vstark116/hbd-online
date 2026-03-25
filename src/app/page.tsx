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

  const cleanName = (rawText: string) => {
    return rawText.replace(/_/g, " ").replace(/\s*\([^)]*\)\s*/g, '');
  };

  const handleSearch = async (day: string, month: string) => {
    setIsSearching(true);
    setResults(null);
    const searchDate = `${day}/${month}`;
    
    // 1. Anime Matches
    const animeMatches = charactersData.filter(char => char.birthDate === searchDate && char.type === "anime");
    let mappedCelebrities: Character[] = charactersData.filter(char => char.birthDate === searchDate && char.type === "celebrity");

    // 2. Wikipedia On This Day API (for Celebrities & Events)
    try {
      // Bắt API Births (Người sinh ra)
      const resBirth = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/vi/onthisday/births/${month}/${day}`);
      const resEnBirth = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`); // Fallback
      
      let birthData = resBirth.ok ? await resBirth.json() : (resEnBirth.ok ? await resEnBirth.json() : null);
      
      if (birthData && birthData.births) {
        const wikiBirths: Character[] = birthData.births
          .map((b: any, i: number) => {
            const page = b.pages?.[0];
            const name = cleanName(page?.title || b.text.split(" - ")[0]);
            let desc = page?.extract || page?.description || b.text;
            if (desc.length > 120) desc = desc.substring(0, 120) + "...";
            
            return {
              id: `wiki-birth-${i}`,
              name: name,
              birthDate: searchDate,
              avatar: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
              occupation: b.year ? `Sinh năm ${b.year}` : "Người nổi tiếng",
              didYouKnow: desc,
              type: 'celebrity'
            } as Character;
          })
          .filter((c: any) => c.avatar && !c.avatar.includes("Wikipedia-logo"));

        mappedCelebrities = [...mappedCelebrities, ...wikiBirths];
      }

      // Bắt API Events (Sự kiện lịch sử)
      const resEvent = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/vi/onthisday/events/${month}/${day}`);
      const resEnEvent = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`);
      
      let eventData = resEvent.ok ? await resEvent.json() : (resEnEvent.ok ? await resEnEvent.json() : null);

      if (eventData && eventData.events) {
        const wikiEvents: Character[] = eventData.events
          .map((e: any, i: number) => {
            const page = e.pages?.[0];
            let desc = page?.extract || e.text;
            if (desc.length > 150) desc = desc.substring(0, 150) + "...";
            
            return {
              id: `wiki-event-${i}`,
              name: `Sự kiện Năm ${e.year}`,
              birthDate: searchDate,
              avatar: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
              occupation: "Dấu ấn lịch sử",
              didYouKnow: desc,
              type: 'celebrity' // Reusing formatting
            } as Character;
          })
          .filter((c: any) => c.avatar && !c.avatar.includes("Wikipedia-logo"));

        mappedCelebrities = [...mappedCelebrities, ...wikiEvents];
      }

    } catch (err) {
      console.warn("Lỗi tải API Wikipedia, chuyển sang dữ liệu nội bộ.");
    } finally {
      // Bố lọc trùng & Hệ Thống Tính Điểm Sự Kiện (AI Scoring)
      const uniqueItems = Array.from(new Map(mappedCelebrities.map(item => [item.name, item])).values());
      
      const priorityKeywords = ["việt nam", "hồ chí minh", "chiến tranh", "độc lập", "tổng thống", "vô địch", "cách mạng", "phát xít", "thế chiến", "hoàng đế", "đóng góp", "nổi tiếng"];
      
      const scoredItems = uniqueItems.map(item => {
        let score = 0;
        const textToAnalyze = (item.name + " " + item.didYouKnow).toLowerCase();
        
        priorityKeywords.forEach(kw => {
          if (textToAnalyze.includes(kw)) score += 20; // Trọng số cực lớn cho Từ Khóa Lịch sử vĩ đại
        });
        
        // Thêm điểm nếu sự kiện chi tiết (được ghi chép dài)
        score += Math.min(textToAnalyze.length / 50, 10);
        
        // Add random slight variation so it doesn't look identical if scores are tied
        score += Math.random() * 2;
        
        return { ...item, _score: score };
      });
      
      // Xếp hạng vĩ nhân & sự kiện từ cao xuống thấp
      scoredItems.sort((a, b) => b._score - a._score);
      
      setResults({ 
        anime: animeMatches, 
        celebrity: scoredItems.slice(0, 15) 
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
            Khám phá những nhân vật anime huyền thoại, vĩ nhân thế giới và các sự kiện lịch sử cùng ngày với bạn!
          </p>
        </motion.div>

        <div className="w-full max-w-lg mb-12">
          <SearchForm onSearch={handleSearch} />
          
          {isSearching && (
            <div className="mt-8 flex flex-col items-center justify-center text-pastel-blue drop-shadow-sm">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold tracking-widest uppercase animate-pulse">Đang Lục Tìm Bách Khoa Toàn Thư Wikipedia...</p>
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
                    Oops! Hiện chưa có dữ liệu nào xảy ra vào ngày này trong vũ trụ. 🛸
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
                           🌎 Từ Wikipedia (Khởi Sinh & Lịch Sử)
                         </h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-12 gap-y-12 w-full justify-items-center">
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