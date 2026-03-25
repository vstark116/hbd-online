"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import CharacterCard from "@/components/CharacterCard";
import { charactersData, Character } from "@/data/mockData";
import { Sparkles, SpaceIcon as Calendar, Gift, Loader2, Star, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = useState<{ anime: Character[], highlighted: Character[], allWiki: Character[] } | null>(null);
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
    const localCelebrities = charactersData.filter(char => char.birthDate === searchDate && char.type === "celebrity");

    let highlighted: Character[] = [...localCelebrities];
    let allWiki: Character[] = [];

    // TỪ KHÓA ĐIỂM CAO ĐỂ LỌC VĨ NHÂN, VIP, SỰ KIỆN QUỐC TẾ, LỊCH SỬ VN (ĐA NGÔN NGỮ)
    const priorityKeywords = [
      // 1. NHÂN VẬT ẢNH HƯỞNG (Lãnh đạo, Khoa học, Tỷ phú)
      "tổng thống", "thủ tướng", "đại tướng", "lãnh đạo", "vua", "nữ hoàng", "hoàng đế",
      "nhà khoa học", "nhà nghiên cứu", "nhà phát minh", "giáo sư", "tỷ phú", "sáng lập",
      "nobel", "oscar", "pulitzer", "đóng góp", "nổi tiếng", "vĩ đại",
      // Tiếng Anh
      "president", "prime minister", "general", "leader", "king", "queen", "emperor",
      "scientist", "researcher", "inventor", "professor", "billionaire", "founder", "ceo",
      "nobel prize", "academy award", "oscar", "contribution", "famous", "influential",

      // 2. THỂ THAO & NGHỆ THUẬT (Vận động viên, Siêu sao)
      "vận động viên", "vô địch", "kỷ lục", "huy chương", "thể thao", "bóng đá", "cúp",
      "ca sĩ", "diễn viên", "nghệ sĩ", "đạo diễn",
      // Tiếng Anh
      "athlete", "champion", "record", "medal", "sports", "football", "soccer", "world cup",
      "singer", "actor", "actress", "artist", "director", "legend",

      // 3. SỰ KIỆN LỊCH SỬ VIỆT NAM (Trọng tâm)
      "việt nam", "hồ chí minh", "chiến tranh việt nam", "độc lập", "cách mạng", 
      "giải phóng", "thống nhất", "điện biên phủ", "việt minh", "mặt trận",
      "30 tháng 4", "2 tháng 9", "1945", "1975",
      // Tiếng Anh
      "vietnam", "ho chi minh", "vietnam war", "independence", "revolution",
      "liberation", "reunification", "fall of saigon", "dien bien phu", "viet minh",

      // 4. SỰ KIỆN QUỐC TẾ ĐỘNG TRỜI (Chiến tranh, Khủng bố)
      "chiến tranh", "thế chiến", "chiến dịch", "đế quốc", "lịch sử", "hiệp ước",
      "tháp đôi", "tòa tháp", "khủng bố", "ám sát", "11 tháng 9",
      // Tiếng Anh
      "war", "world war", "campaign", "empire", "history", "treaty", "assassination",
      "twin towers", "september 11", "9/11", "terror", "terrorist", "attack", "tragedy",

      // 5. THIÊN TAI & THẢM HỌA (Bão, Động đất, Sóng thần)
      "thiên tai", "thảm họa", "động đất", "sóng thần", "bão", "siêu bão", "núi lửa", "đại dịch",
      // Tiếng Anh
      "disaster", "catastrophe", "earthquake", "tsunami", "hurricane", "typhoon", 
      "storm", "volcano", "eruption", "pandemic", "plague"
    ];

    const calculateScore = (name: string, desc: string) => {
      let score = 0;
      const textToAnalyze = (name + " " + desc).toLowerCase();
      priorityKeywords.forEach(kw => {
        if (textToAnalyze.includes(kw)) score += 50; 
      });
      score += Math.min(textToAnalyze.length / 20, 15); // Bonus cho bài viết dài/chi tiết
      return score;
    };

    try {
      // API tiếng Việt (vi) bị giới hạn hỗ trợ từ gốc Wikimedia khiến trình duyệt báo 404 Error
      // Dùng trực tiếp API English (en) để đảm bảo 100% tỷ lệ load sự kiện siêu khổng lồ không lỗi.
      const resSel = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`);
      const selData = resSel.ok ? await resSel.json() : { selected: [] };

      if (selData.selected) {
        const wikiHighlights = selData.selected.map((s: any, i: number) => {
          const page = s.pages?.[0];
          let desc = page?.extract || s.text;
          if (desc.length > 150) desc = desc.substring(0, 150) + "...";
          return {
            id: `hl-${i}`,
            name: cleanName(page?.title || s.text.split(" - ")[0] || "Sự Kiện Lớn"),
            birthDate: searchDate,
            avatar: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
            occupation: s.year ? `Cột mốc năm ${s.year}` : "Sự Kiện Lịch Sử",
            didYouKnow: desc,
            type: 'celebrity'
          } as Character;
        }).filter((c: any) => c.avatar && !c.avatar.includes("Wikipedia-logo")); 
        
        highlighted = [...highlighted, ...wikiHighlights];
      }

      // API Lịch sử & Sinh Nhật toàn cầu
      const resBirth = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`);
      const resEvent = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`);
      
      const birthData = resBirth.ok ? await resBirth.json() : { births: [] };
      const eventData = resEvent.ok ? await resEvent.json() : { events: [] };

      const rawMassiveList = [...(birthData.births || []), ...(eventData.events || [])];

      allWiki = rawMassiveList.map((m: any, i: number) => {
        const page = m.pages?.[0];
        const name = cleanName(page?.title || m.text.split(" - ")[0] || "Unknown");
        let desc = page?.extract || page?.description || m.text;
        if (desc.length > 120) desc = desc.substring(0, 120) + "...";
        
        return {
          id: `all-${i}`,
          name: name,
          birthDate: searchDate,
          avatar: page?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/150px-Wikipedia-logo-v2.svg.png",
          occupation: m.year ? `Năm ${m.year}` : "Nhân vật / Sự kiện",
          didYouKnow: desc,
          type: 'celebrity',
          _score: calculateScore(name, desc) // Chấm điểm ngay lập tức
        } as Character & { _score: number };
      });

    } catch (err) {
      console.warn("Lỗi tải API Wikipedia, chuyển sang dữ liệu nội bộ.");
    } finally {
      // 1. Phân loại Highlighted (Duy nhất 1)
      const uniqueHighlighted = Array.from(new Map(highlighted.map(item => [item.name, item])).values());
      
      // 2. Sắp xếp Tất Cả Sự Kiện theo Điểm Số AI để đẩy Tổng Thống, Sự kiện lớn lên đầu
      const scoredAllWiki = allWiki as (Character & { _score: number })[];
      scoredAllWiki.sort((a, b) => b._score - a._score);
      const uniqueAllWiki = Array.from(new Map(scoredAllWiki.map(item => [item.name, item])).values());

      setResults({ 
        anime: animeMatches, 
        highlighted: uniqueHighlighted.slice(0, 12), // Giới hạn top nổi bật
        allWiki: uniqueAllWiki.slice(0, 50) // Hiện tới TẬN 50 sự kiện phía dưới cho người dùng cuộn mỏi tay!
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
            Khám phá những nhân vật anime huyền thoại, vĩ nhân thế giới và vô số sự kiện lịch sử cùng ngày với bạn!
          </p>
        </motion.div>

        <div className="w-full max-w-lg mb-12">
          <SearchForm onSearch={handleSearch} />
          
          {isSearching && (
            <div className="mt-8 flex flex-col items-center justify-center text-pastel-blue drop-shadow-sm">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold tracking-widest uppercase animate-pulse">Đang Lục Tìm Hàng Triệu Biên Niên Sử Toàn Cầu...</p>
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
            Tạo Quà Ảo Mây
          </Link>
        </div>

        <AnimatePresence>
          {results && !isSearching && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {results.anime.length === 0 && results.highlighted.length === 0 && results.allWiki.length === 0 ? (
                <div className="text-center bg-white/50 p-10 rounded-[2rem] border border-dashed border-gray-300 max-w-lg mx-auto">
                  <p className="text-xl text-gray-600 font-medium">
                    Oops! Có vẻ là ngày này trong vũ trụ chưa từng xảy ra sự kiện nào nổi bật cả. 🛸
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 w-full max-w-6xl">
                  
                  {/* QUỐC BẢO ANIME */}
                  {results.anime.length > 0 && (
                     <section className="flex flex-col items-center">
                       <div className="bg-gradient-to-r from-pastel-pink to-[#ffb6c1] px-10 py-4 rounded-full mb-10 shadow-lg border-2 border-white transform hover:scale-105 transition-transform">
                         <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                           🌟 Anime & Manga Huyền Thoại
                         </h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                         {results.anime.map(char => <CharacterCard key={char.id} character={char} />)}
                       </div>
                     </section>
                  )}

                  {/* SỰ KIỆN & VĨ NHÂN NỔI BẬT NHẤT */}
                  {results.highlighted.length > 0 && (
                     <section className="flex flex-col items-center">
                       <div className="bg-gradient-to-r from-pastel-yellow to-[#ffe066] px-10 py-4 rounded-full mb-10 shadow-lg border-2 border-white transform hover:scale-105 transition-transform">
                         <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                           👑 Tiêu Điểm: Nhân Vật & Di Sản Vĩ Đại Khởi Sinh 
                           <Star fill="currentColor" size={28} className="text-yellow-500"/>
                         </h2>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                         {results.highlighted.map(char => <CharacterCard key={char.id} character={char} />)}
                       </div>
                     </section>
                  )}

                  {/* TẤT CẢ SỰ KIỆN DÀI BẤT TẬN (ĐÃ SORT BẰNG AI THEO ĐỘ NỔI TIẾNG) */}
                  {results.allWiki.length > 0 && (
                     <section className="flex flex-col items-center mt-8 pt-16 border-t border-pastel-pink/30 relative">
                       <div className="absolute top-[-30px] bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm flex items-center gap-2">
                         <Globe className="text-pastel-blue animate-pulse" />
                         <span className="font-bold text-gray-600 uppercase tracking-widest text-sm">Hồ Sơ Hành Tinh (50+ Sự Kiện Mở Rộng)</span>
                       </div>
                       
                       <p className="text-gray-500 font-medium text-center max-w-2xl mb-12">
                         Dưới đây là một hành trình dài ghi chép lại mọi sự kiện, nhà khoa học, tỷ phú, diễn viên hay vận động viên có trên hệ thống. 
                       </p>

                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center opacity-90">
                         {results.allWiki.map(char => (
                           // Thu nhỏ thẻ AllWiki một tí để nhìn được nhiều dữ liệu hơn
                           <div key={char.id} className="scale-90 w-full flex justify-center hover:scale-95 transition-transform hover:opacity-100 opacity-95">
                             <CharacterCard character={char} />
                           </div>
                         ))}
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