"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Wand2, Copy, Check, PenTool, Image as ImageIcon, Music, Palette } from "lucide-react";
import Link from "next/link";
import { charactersData } from "@/data/mockData";

export default function CreateGiftPage() {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [mode, setMode] = useState("AI"); 
  const [style, setStyle] = useState("Doraemon");
  const [customMessage, setCustomMessage] = useState("");
  
  // New features
  const [imageUrl, setImageUrl] = useState("");
  const [music, setMusic] = useState("none");
  const [themeColor, setThemeColor] = useState("pink");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !sender) return;
    if (mode === "CUSTOM" && !customMessage) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      const id = Math.random().toString(36).substring(2, 9);
      
      let linkParams = `?to=${encodeURIComponent(recipient)}&from=${encodeURIComponent(sender)}`;
      
      if (mode === "CUSTOM" && customMessage) {
        const encodedMsg = btoa(unescape(encodeURIComponent(customMessage)));
        linkParams += `&msg=${encodedMsg}`;
      } else {
        linkParams += `&style=${encodeURIComponent(style)}`;
      }
      
      if (imageUrl) linkParams += `&img=${encodeURIComponent(imageUrl)}`;
      if (music !== "none") linkParams += `&bgm=${music}`;
      if (themeColor !== "pink") linkParams += `&theme=${themeColor}`;
      
      setGeneratedLink(`${window.location.origin}/gift/${id}${linkParams}`);
    }, mode === "AI" ? 2500 : 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-pastel-cream flex flex-col items-center justify-center font-quicksand p-4 relative overflow-hidden pb-12">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-pastel-pink rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pastel-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-2xl w-full pt-6">
        <div className="mb-4 flex justify-center sm:justify-start">
          <Link href="/" className="text-pastel-blue hover:text-pink-400 font-bold transition-colors bg-white/60 px-4 py-2 rounded-full backdrop-blur inline-block shadow-sm">
            ← Về Trang Chủ
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] shadow-xl border-2 border-pastel-pink/30 w-full"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pastel-pink to-[#ffb6c1] rounded-full mb-4 shadow-lg text-white">
              <GiftIcon />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Tạo Hộp Quà Ảo
            </h1>
            
            <div className="flex bg-gray-100 rounded-full p-1 max-w-xs mx-auto mt-4 border border-gray-200">
              <button 
                onClick={() => setMode("AI")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm font-bold transition-all ${mode === "AI" ? "bg-white shadow text-pink-500" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Wand2 size={16} /> Nhờ AI
              </button>
              <button 
                onClick={() => setMode("CUSTOM")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm font-bold transition-all ${mode === "CUSTOM" ? "bg-white shadow text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
              >
                <PenTool size={16} /> Tự Viết
              </button>
            </div>
          </div>

          {!generatedLink ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Người Nhận
                  </label>
                  <input 
                    type="text" 
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                    placeholder="Tên họ..."
                    className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-pink/50 transition-all font-bold text-lg border border-gray-100/50"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Người Gửi
                  </label>
                  <input 
                    type="text" 
                    value={sender}
                    onChange={e => setSender(e.target.value)}
                    placeholder="Tên bạn..."
                    className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-pink/50 transition-all font-bold text-lg border border-gray-100/50"
                    required
                  />
                </div>
              </div>

              {mode === "AI" ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide mt-2">
                    Phong Cách AI Sáng Tác
                  </label>
                  <div className="relative">
                    <select 
                      value={style}
                      onChange={e => setStyle(e.target.value)}
                      className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-2xl p-4 pr-10 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg border border-gray-100/50 cursor-pointer"
                    >
                      <option value="Ngọt ngào">💌 Ngọt ngào & Chân thành</option>
                      <option value="Hài hước">🤣 Hài hước & Bá đạo</option>
                      {charactersData.map(c => (
                        <option key={c.id} value={c.name}>🌟 Giọng văn của {c.name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide mt-2">
                    Lời Chúc Sinh Nhật
                  </label>
                  <textarea 
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                    placeholder="Viết những điều tốt đẹp nhất gửi đến họ nhé..."
                    className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-medium text-lg border border-gray-100/50 min-h-[120px] resize-none"
                    required
                  />
                </motion.div>
              )}

              <div className="bg-pastel-pink/10 p-5 rounded-2xl border border-pastel-pink/30 space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-2"><Sparkles className="text-pink-400" size={18}/> Trang Trí Thêm Nội Dung </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><ImageIcon size={14}/> Hình Ảnh (Link URL)</label>
                    <input 
                      type="url" 
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-pastel-pink/50 text-sm border border-gray-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Music size={14}/> Nhạc Nền</label>
                    <select 
                      value={music}
                      onChange={e => setMusic(e.target.value)}
                      className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-pastel-blue/50 text-sm border border-gray-200"
                    >
                      <option value="none">Tắt</option>
                      <option value="happy">Nhạc Sinh Nhật Vui Tươi</option>
                      <option value="piano">Nhạc Piano Nhẹ Nhàng</option>
                      <option value="lofi">Lofi Chill Đáng Yêu</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Palette size={14}/> Theme Quà</label>
                    <select 
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-pastel-yellow/50 text-sm border border-gray-200"
                    >
                      <option value="pink">Hồng Pastel ngọt ngào</option>
                      <option value="blue">Xanh Blue năng động</option>
                      <option value="yellow">Vàng Bơ ấm áp</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isGenerating || !recipient || !sender || (mode === "CUSTOM" && !customMessage)}
                className="w-full bg-gradient-to-r from-pastel-pink to-[#ffb6c1] hover:to-[#ffa6b3] text-gray-800 font-extrabold text-xl py-4 rounded-2xl transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-lg shadow-pink-200/50 disabled:opacity-70 disabled:cursor-not-allowed group mt-8"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="animate-spin" size={24} />
                    {mode === "AI" ? "Đang Nhờ AI Viết..." : "Đang Đóng Gói..."}
                  </>
                ) : (
                  <>
                    {mode === "AI" ? <Wand2 size={24} className="group-hover:rotate-12 transition-transform" /> : <GiftIcon className="group-hover:scale-110 transition-transform" />}
                    Tạo Link Quà Tặng
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-[#e6f4ea] text-green-700 p-4 rounded-2xl font-bold mb-6 flex items-center justify-center gap-2 border border-green-200">
                <Check size={20} /> Đã Tạo & Đóng Gói Thành Công!
              </div>
              <p className="text-gray-600 font-medium mb-3">Link hộp quà ảo của bạn (hãy gửi cho {recipient}):</p>
              
              <div className="flex items-center gap-2 bg-pastel-cream p-3 rounded-2xl border border-gray-200 focus-within:ring-2 ring-pastel-blue transition-all mb-8">
                <input 
                  type="text" 
                  value={generatedLink}
                  readOnly 
                  className="bg-transparent w-full text-gray-600 outline-none px-2 font-mono text-sm"
                />
                <button 
                  onClick={copyToClipboard}
                  className="bg-pastel-blue hover:bg-blue-300 text-gray-700 p-3 rounded-xl transition-colors flex shrink-0 items-center justify-center active:scale-95 shadow-sm"
                >
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href={generatedLink} 
                  className="inline-flex items-center justify-center gap-2 text-white bg-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-700 transition shadow"
                  target="_blank"
                >
                  Mở Thử Xem Món Quà <ArrowRight size={18} />
                </a>
                <button 
                  onClick={() => setGeneratedLink("")}
                  className="text-gray-500 hover:text-pastel-pink font-semibold underline underline-offset-4 text-sm"
                >
                  Tạo món quà khác
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}