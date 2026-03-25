"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Wand2, Copy, Check, PenTool, Image as ImageIcon, Music, Palette, UploadCloud, Tag, QrCode } from "lucide-react";
import Link from "next/link";
import { charactersData } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

export default function CreateGiftPage() {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [mode, setMode] = useState("AI"); 
  const [style, setStyle] = useState("Doraemon");
  const [customMessage, setCustomMessage] = useState("");
  const [giftType, setGiftType] = useState("gift"); // "gift", "card"
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [music, setMusic] = useState("none");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [themeColor, setThemeColor] = useState("pink");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !sender) return;
    if (mode === "CUSTOM" && !customMessage) return;
    if (music === "upload" && !musicFile) {
      alert("Vui lòng chọn file nhạc nền để tải lên nhé!");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // 1. Generate elegant slug
      const safeName = removeAccents(recipient).toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
      const shortId = Math.random().toString(36).substring(2, 6);
      const slug = `${safeName}-${giftType}-${shortId}`;

      // 2. Upload photo if chosen
      let uploadedImageUrl = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${slug}-img-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage.from('gifts_media').upload(fileName, imageFile);
        if (uploadError) {
          console.error("Upload image error:", uploadError);
          alert("Tải ảnh thất bại! Hãy chắc chắn kho lưu trữ đã được mở khóa.");
        } else if (uploadData) {
          uploadedImageUrl = supabase.storage.from('gifts_media').getPublicUrl(fileName).data.publicUrl;
        }
      }

      // 3. Upload audio if custom
      let finalMusicUrl = music;
      if (music === "upload" && musicFile) {
        const fileExt = musicFile.name.split('.').pop();
        const fileName = `${slug}-audio-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage.from('gifts_media').upload(fileName, musicFile);
        if (uploadError) {
          console.error("Upload audio error:", uploadError);
          alert("Tải nhạc thất bại do file lỗi hoặc kết nối mạng.");
        } else if (uploadData) {
          finalMusicUrl = supabase.storage.from('gifts_media').getPublicUrl(fileName).data.publicUrl;
        }
      }

      // 4. Save to Database
      const messageToSave = mode === "CUSTOM" ? customMessage : "";
      const styleToSave = mode === "AI" ? style : "";

      const { error: dbError } = await supabase
        .from('gifts')
        .insert({
          id: slug,
          recipient,
          sender,
          message: messageToSave,
          style: styleToSave,
          image_url: uploadedImageUrl,
          music: finalMusicUrl,
          theme: themeColor
        });
        
      if (dbError) throw dbError;

      // 5. Return new extremely short link
      setGeneratedLink(`${window.location.origin}/${slug}`);
    } catch (err) {
      console.error("Lỗi Database:", err);
      alert("Lỗi kết nối Database! Vui lòng đảm bảo bạn đã chạy mã SQL thành công.");
    } finally {
      setIsGenerating(false);
    }
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
              Tạo Hộp Quà Đám Mây
            </h1>
            <p className="text-sm font-semibold text-gray-500 mb-2">Supabase Sync Enabled ✨</p>
            
            <div className="flex bg-gray-100 rounded-full p-1 max-w-xs mx-auto mt-4 border border-gray-200">
              <button 
                type="button"
                onClick={() => setMode("AI")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm font-bold transition-all ${mode === "AI" ? "bg-white shadow text-pink-500" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Wand2 size={16} /> Nhờ AI
              </button>
              <button 
                type="button"
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
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Người Nhận</label>
                  <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Tên họ..." className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-pink/50 font-bold border border-gray-100" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Người Gửi</label>
                  <input type="text" value={sender} onChange={e => setSender(e.target.value)} placeholder="Tên bạn..." className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-pink/50 font-bold border border-gray-100" required />
                </div>
              </div>

              {mode === "AI" ? (
                <div className="animate-in fade-in zoom-in-95">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Phong Cách Lời Chúc (AI)</label>
                  <select value={style} onChange={e => setStyle(e.target.value)} className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-2xl p-4 font-bold border-gray-100 border cursor-pointer focus:ring-4 focus:ring-pastel-blue/50 outline-none">
                    <option value="Ngọt ngào">💌 Ngọt ngào & Chân thành</option>
                    <option value="Hài hước">🤣 Hài hước & Bá đạo</option>
                    {charactersData.map(c => (
                      <option key={c.id} value={c.name}>🌟 Giọng văn của {c.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Lời Chúc Sinh Nhật</label>
                  <textarea value={customMessage} onChange={e => setCustomMessage(e.target.value)} placeholder="Viết những điều tốt đẹp nhất..." className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 font-medium border border-gray-100 min-h-[120px] resize-none" required />
                </div>
              )}

              <div className="bg-pastel-pink/10 p-5 rounded-2xl border border-pastel-pink/30 space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-2"><Sparkles className="text-pink-400" size={18}/> Trang Trí Thêm File Lớn </h3>
                
                <div className="flex flex-col gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><UploadCloud size={14}/> Tải Tấm Ảnh Đẹp Nhất Lên</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]);
                      }}
                      className="w-full bg-white text-gray-700 font-medium rounded-xl p-2 outline-none text-sm border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pastel-pink/20 file:text-pink-700 hover:file:bg-pastel-pink/40"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Music size={14}/> Nhạc Nền</label>
                    <select value={music} onChange={e => setMusic(e.target.value)} className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none text-sm border border-gray-200">
                      <option value="none">Tắt</option>
                      <option value="happy">Nhạc Sinh Nhật Vui Tươi</option>
                      <option value="piano">Nhạc Piano Nhẹ Nhàng</option>
                      <option value="lofi">Lofi Chill Đáng Yêu</option>
                      <option value="upload">🌟 Tải Nhạc Từ Máy Lên (Mp3)</option>
                    </select>
                  </div>

                  <div className="flex-1 w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Palette size={14}/> Theme Quà</label>
                    <select value={themeColor} onChange={e => setThemeColor(e.target.value)} className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none text-sm border border-gray-200">
                      <option value="pink">Hồng Pastel ngọt ngào</option>
                      <option value="blue">Xanh Blue năng động</option>
                      <option value="yellow">Vàng Bơ ấm áp</option>
                    </select>
                  </div>
                </div>

                {music === "upload" && (
                  <div className="w-full animate-in fade-in slide-in-from-top-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><UploadCloud size={14}/> Chọn File Nhạc (.mp3, .wav)</label>
                    <input 
                      type="file" 
                      accept="audio/*"
                      onChange={e => {
                        if (e.target.files && e.target.files.length > 0) setMusicFile(e.target.files[0]);
                      }}
                      className="w-full bg-white text-gray-700 font-medium rounded-xl p-2 outline-none text-sm border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                  </div>
                )}
                
                <div className="flex-1 mt-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Tag size={14}/> Cấu Hình Đường Dẫn</label>
                    <select value={giftType} onChange={e => setGiftType(e.target.value)} className="w-full bg-white text-gray-800 rounded-xl p-3 outline-none text-sm border border-gray-200">
                      <option value="gift">🎁 Loại Quà Tặng (/{removeAccents(recipient).toLowerCase().replace(/[^a-z0-9]/g,"-") || "ten"}-gift)</option>
                      <option value="card">💌 Loại Thiệp Tặng (/{removeAccents(recipient).toLowerCase().replace(/[^a-z0-9]/g,"-") || "ten"}-card)</option>
                    </select>
                    <p className="text-xs text-gray-500 font-medium mt-1 ml-1 cursor-default">Đường dẫn rút gọn của bạn sẽ cực kỳ tinh tế.</p>
                </div>

              </div>

              <button type="submit" disabled={isGenerating || !recipient || !sender || (mode === "CUSTOM" && !customMessage)} className="w-full bg-gradient-to-r from-pastel-pink to-[#ffb6c1] hover:to-[#ffa6b3] text-gray-800 font-extrabold text-xl py-4 rounded-2xl transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-lg shadow-pink-200/50 disabled:opacity-70 disabled:cursor-not-allowed group mt-8">
                {isGenerating ? (
                  <><Sparkles className="animate-spin" size={24} /> Đang Upload & Đóng Gói Database...</>
                ) : (
                  <><GiftIcon className="group-hover:scale-110 transition-transform" /> Tạo Link & Mã QR</>
                )}
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="bg-[#e6f4ea] text-green-700 p-4 rounded-2xl font-bold mb-6 flex items-center justify-center gap-2 border border-green-200">
                <Check size={20} /> Đã Tạo & Upload File Thành Công!
              </div>
              <p className="text-gray-600 font-medium mb-3">Link cực xịn của bạn (hãy chia sẻ qua Facebook/Zalo):</p>
              
              <div className="flex items-center gap-2 bg-pastel-cream p-3 rounded-2xl border border-gray-200 focus-within:ring-2 ring-pastel-blue transition-all mb-6">
                <input type="text" value={generatedLink} readOnly className="bg-transparent w-full text-blue-600 outline-none px-2 font-bold text-sm" />
                <button onClick={copyToClipboard} className="bg-pastel-blue hover:bg-blue-300 text-gray-700 p-3 rounded-xl transition-colors flex shrink-0 items-center justify-center active:scale-95 shadow-sm">
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center mb-8">
                 <p className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                   <QrCode size={16} /> Quét Để Trải Nghiệm
                 </p>
                 <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-2xl">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(generatedLink)}&margin=10`} 
                      alt="QR Code" 
                      className="w-[180px] h-[180px]"
                    />
                 </div>
                 <a 
                   href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(generatedLink)}&margin=20`}
                   download="Qua-Tang-QR.png"
                   target="_blank"
                   className="mt-4 text-xs font-bold text-pastel-blue hover:text-blue-500 underline underline-offset-4"
                 >
                   Mở QR Chất Lượng Cao
                 </a>
              </div>

              <div className="flex flex-col gap-4">
                <a href={generatedLink} className="inline-flex items-center justify-center gap-2 text-white bg-gray-800 px-6 py-4 rounded-2xl font-bold hover:bg-gray-700 transition shadow" target="_blank">
                  Khui Hộp Quà Thử Ngay <ArrowRight size={18} />
                </a>
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
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}