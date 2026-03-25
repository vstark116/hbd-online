"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface CountdownTimerProps {
  targetDateStr: string;
  name: string;
  age?: number | null;
}

export default function CountdownTimer({ targetDateStr, name, age }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [isFinished, setIsFinished] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFinished(true);
        
        if (!hasTriggered) {
          triggerHappyBirthday();
          setHasTriggered(true);
        }
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr, hasTriggered]);

  const triggerHappyBirthday = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#fed7e2', '#bee3f8', '#fefcbf'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#fed7e2', '#bee3f8', '#fefcbf'] });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 backdrop-blur rounded-3xl w-24 h-28 md:w-28 md:h-32 flex items-center justify-center shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-white/50 mb-3 hover:-translate-y-2 transition-transform duration-300">
        <span className="text-4xl md:text-6xl font-extrabold text-[#ffb6c1] font-quicksand drop-shadow-sm">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center z-10 relative">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-quicksand font-extrabold text-gray-800 mb-12 leading-tight"
      >
        {isFinished ? (
          <span className="text-pink-500 block animate-bounce drop-shadow-md">
            🎉 Chúc Mừng Sinh Nhật <br/> 
            {age ? `Lần Thứ ${age} ` : ''} Của {name}! 🎉
          </span>
        ) : (
          <span>
            Đếm Ngược Sinh Nhật <br/> 
            <span className="text-pastel-blue">{name}</span> {age ? `(Sinh Nhật Thứ ${age})` : ''}
          </span>
        )}
      </motion.h1>

      {!isFinished && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex gap-4 md:gap-8"
        >
          <TimeUnit value={timeLeft.days} label="Ngày" />
          <TimeUnit value={timeLeft.hours} label="Giờ" />
          <TimeUnit value={timeLeft.minutes} label="Phút" />
          <TimeUnit value={timeLeft.seconds} label="Giây" />
        </motion.div>
      )}
    </div>
  );
}