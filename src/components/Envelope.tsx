"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mail } from "lucide-react";

interface EnvelopeProps {
  title: string;
  message: string;
  photoUrl?: string;
  musicUrl?: string;
}

export default function Envelope({ title, message, photoUrl, musicUrl }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (musicUrl && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log('Audio autoplay blocked', e));
      }
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] py-10 perspective-[1000px]">
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop />}

      {/* Âm thanh Switch */}
      {isOpen && musicUrl && (
        <button 
          onClick={toggleAudio}
          className="absolute top-0 right-0 z-50 bg-white/50 backdrop-blur p-3 rounded-full hover:bg-white/80 transition shadow-lg"
        >
          {isPlaying ? <Volume2 size={24} className="text-pastel-blue" /> : <VolumeX size={24} className="text-gray-400" />}
        </button>
      )}

      {!isOpen ? (
        <motion.div 
          onClick={handleOpen}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative cursor-pointer group flex items-center justify-center w-80 h-56 mt-20"
        >
          {/* Mặt sau phong bì */}
          <div className="absolute inset-0 bg-pink-100 rounded-lg shadow-xl overflow-hidden border border-pink-200">
             {/* Text nhắc nhở */}
             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="text-pink-400 font-bold uppercase tracking-widest bg-white/70 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                  <Mail size={16} /> Mở Thư
                </span>
             </div>
          </div>
          
          {/* Nắp phong bì (gập xuống) */}
          <div className="absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-pink-200 origin-top transform transition-transform duration-500 group-hover:-translate-y-2 z-20"></div>

          {/* Cánh hai bên */}
          <div className="absolute inset-0 w-0 h-0 border-b-[224px] border-l-[160px] border-r-[160px] border-l-pink-50 border-r-pink-50 border-b-pink-100 rounded-lg z-10"></div>
          
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
            className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 relative z-30 flex flex-col items-center"
          >
            {/* Header / Tem thư */}
            <div className="w-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-pink-50 py-4 px-6 border-b border-pink-100 flex justify-between items-center">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">Air Mail</span>
              <div className="w-8 h-10 border-2 border-dashed border-pink-200 rounded-sm bg-white rotate-6"></div>
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center text-center w-full relative">
              <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-rose-400 mb-8 pb-2">
                {title}
              </h2>
              
              {photoUrl && (
                <div className="mb-10 p-3 bg-white shadow-lg rounded-2xl rotate-2 hover:rotate-0 transition duration-500 border border-gray-100">
                  <img src={photoUrl} alt="Trang trí" className="max-w-full h-auto max-h-[400px] object-contain rounded-xl" />
                </div>
              )}
              
              <div className="w-full max-w-lg relative">
                {/* Custom quotes */}
                <span className="text-6xl text-pink-200 absolute -top-8 -left-6 font-serif opacity-50">"</span>
                <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed whitespace-pre-wrap relative z-10 font-quicksand">
                  {message}
                </p>
                <span className="text-6xl text-pink-200 absolute -bottom-16 -right-6 font-serif opacity-50 rotate-180">"</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
