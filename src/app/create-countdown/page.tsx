"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateCountdownPage() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState(""); // optional birth year
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    let dateParam = `${day}/${month}`;
    if (year && year.length === 4) {
      dateParam += `/${year}`;
    }
    
    const link = `${window.location.origin}/happy-birthday/${encodeURIComponent(name)}?date=${dateParam}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-pastel-cream flex flex-col items-center justify-center font-quicksand p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-pastel-blue rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      
      <div className="relative z-10 max-w-xl w-full">
        <div className="mb-6">
          <Link href="/" className="text-pastel-blue hover:text-pink-400 font-bold transition-colors bg-white/60 px-4 py-2 rounded-full backdrop-blur inline-block shadow-sm">
            ← Về Trang Chủ
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border-2 border-pastel-blue/30 w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pastel-blue to-blue-300 rounded-full mb-4 shadow-lg text-white">
              <CalendarDays size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Tạo Đếm Ngược Sinh Nhật
            </h1>
          </div>

          {!generatedLink ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Tên Chủ Nhân Bữa Tiệc
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ví dụ: Tâm Võ..."
                  className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg border border-gray-100/50"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Ngày</label>
                  <div className="relative">
                    <select 
                      value={day} onChange={e => setDay(e.target.value)}
                      className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg cursor-pointer"
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tháng</label>
                  <div className="relative">
                    <select 
                      value={month} onChange={e => setMonth(e.target.value)}
                      className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg cursor-pointer"
                    >
                      {months.map(m => <option key={m} value={m}>Tháng {m}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex-[1.2]">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Năm sinh (tùy chọn)</label>
                  <input 
                    type="number" 
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="VD: 1999"
                    className="w-full bg-pastel-cream text-gray-800 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg border border-gray-100/50"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!name}
                className="w-full bg-gradient-to-r from-pastel-blue to-[#8bcbf9] hover:to-[#a9d8fa] text-gray-800 font-extrabold text-xl py-4 rounded-2xl transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-lg shadow-blue-200/50 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Trích Xuất Link Đếm Ngược
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-[#e6f4ea] text-green-700 p-4 rounded-2xl font-bold mb-6 flex items-center justify-center gap-2 border border-green-200">
                <Check size={20} /> Link đã sẵn sàng!
              </div>
              <p className="text-gray-600 font-medium mb-3">Copy link dưới đây để xem đếm ngược hoặc gửi cho {name}:</p>
              
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
                  Đến Trang Đếm Ngược Ngay <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}