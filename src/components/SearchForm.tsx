"use client";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFormProps {
  onSearch: (day: string, month: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(day, month);
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      onSubmit={handleSubmit} 
      className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border-2 border-pastel-blue/40 max-w-md w-full mx-auto relative z-10"
    >
      <div className="absolute -top-6 -right-6 text-pastel-yellow animate-bounce">
        <Sparkles size={48} fill="currentColor" />
      </div>

      <h2 className="text-3xl font-quicksand font-extrabold text-center mb-8 text-gray-800 flex flex-col items-center gap-2">
        <span>Sinh Nhật Của Bạn</span>
        <span className="text-pink-400">Là Ngày Nào? 🎂</span>
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-500 mb-3 tracking-wide uppercase">Ngày</label>
          <div className="relative">
            <select 
              value={day} 
              onChange={(e) => setDay(e.target.value)}
              className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-xl p-4 pr-10 outline-none focus:ring-4 focus:ring-pastel-pink/50 transition-all font-bold text-lg cursor-pointer"
            >
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-500 mb-3 tracking-wide uppercase">Tháng</label>
          <div className="relative">
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)}
              className="w-full appearance-none bg-pastel-cream text-gray-800 rounded-xl p-4 pr-10 outline-none focus:ring-4 focus:ring-pastel-blue/50 transition-all font-bold text-lg cursor-pointer"
            >
              {months.map(m => <option key={m} value={m}>Tháng {m}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-pastel-pink to-[#ffb6c1] hover:to-[#ffa6b3] text-gray-800 font-extrabold font-quicksand text-xl py-4 rounded-xl transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-lg shadow-pink-200/50"
      >
        <Search size={24} /> Bắt Đầu Khám Phá
      </button>
    </motion.form>
  );
}