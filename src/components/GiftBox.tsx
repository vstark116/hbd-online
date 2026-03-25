"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface GiftBoxProps {
  sender?: string;
  message: string;
  imageUrl?: string | null;
  music?: string;
  theme?: string;
}

export default function GiftBox({ sender = "Một người bạn", message, imageUrl, music, theme = "pink" }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use public royalty-free music URLs for demo
  const getMusicUrl = (m: string) => {
    switch (m) {
      case "happy": return "https://cdn.pixabay.com/download/audio/2022/01/21/audio_104f4ebdcd.mp3?filename=happy-birthday-music-box-122421.mp3";
      case "piano": return "https://cdn.pixabay.com/download/audio/2022/10/25/audio_82cffe96c9.mp3?filename=beautiful-piano-122709.mp3";
      case "lofi": return "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf589.mp3?filename=lofi-study-112191.mp3";
      default: return null;
    }
  };

  useEffect(() => {
    if (music && music !== "none") {
      const url = getMusicUrl(music);
      if (url) {
        audioRef.current = new Audio(url);
        audioRef.current.loop = true;
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [music]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
    
    // Confetti effect
    const count = 200;
    const defaults = { origin: { y: 0.7 }, zIndex: 100 };
    
    function fire(particleRatio: number, opts: any) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const lidColor = theme === "blue" ? "#90cdf4" : theme === "yellow" ? "#faf089" : "#ffb6c1";
  const boxColor = theme === "blue" ? "#bee3f8" : theme === "yellow" ? "#fefcbf" : "#ffd6e0";
  const ribbonColor = theme === "blue" ? "#ffffff" : theme === "yellow" ? "#ffffff" : "#fff";
  
  return (
    <div className="relative flex items-center justify-center min-h-[400px] w-full z-10">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div 
            key="box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="cursor-pointer relative group flex flex-col items-center"
          >
            <motion.div 
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="relative"
            >
              {/* Lid */}
              <div 
                className="w-48 h-12 rounded-t-xl relative z-20 shadow-lg border-b-2 border-white/20"
                style={{ backgroundColor: lidColor }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-white opacity-80 shadow-sm"></div>
              </div>
              
              {/* Box */}
              <div 
                className="w-44 h-40 rounded-b-2xl mx-auto relative z-10 shadow-xl border border-white/40 overflow-hidden"
                style={{ backgroundColor: boxColor }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-white opacity-80 shadow-sm"></div>
              </div>

              {/* Ribbon Bow */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex z-30 drop-shadow-md">
                <div className="w-12 h-12 border-4 border-white rounded-full bg-transparent -mr-2 skew-y-12 shadow-inner"></div>
                <div className="w-12 h-12 border-4 border-white rounded-full bg-transparent -ml-2 -skew-y-12 shadow-inner"></div>
              </div>
            </motion.div>
            
            <p className="mt-8 text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur">
              Click Vào Hộp Để Mở Quà
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="message"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] max-w-lg w-full text-center relative border-4"
            style={{ borderColor: boxColor }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <span className="text-6xl drop-shadow-lg block animate-bounce">💌</span>
            </div>
            
            <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">
              Quà từ <span className="text-pink-500">{sender}</span>
            </h2>
            
            <div className="w-16 h-1 bg-gradient-to-r from-pastel-pink to-pink-300 mx-auto rounded-full mb-6"></div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-6 whitespace-pre-line">
              {message}
            </p>

            {imageUrl && (
               <div className="mt-4 mb-6 rounded-2xl overflow-hidden shadow-md max-h-[300px] inline-block border-2 border-white">
                 {/*  eslint-disable-next-line @next/next/no-img-element */}
                 <img src={imageUrl} alt="Attached image" className="max-w-full max-h-[300px] object-contain hover:scale-105 transition-transform duration-500" />
               </div>
            )}
            
            <div className="text-sm font-bold text-gray-400 mt-6 mt-10 uppercase tracking-widest">
              --- Birthday Universe ---
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}