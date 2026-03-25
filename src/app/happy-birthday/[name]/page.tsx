import CountdownTimer from "@/components/CountdownTimer";
import CharacterCard from "@/components/CharacterCard";
import { charactersData, Character } from "@/data/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const runtime = 'edge';

export default async function HappyBirthdayPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const resolvedSearchParams = await searchParams;
  
  const dateParam = resolvedSearchParams.date ? String(resolvedSearchParams.date) : null;
  
  let targetDate = new Date();
  let sharedCharacters: Character[] = [];
  let age: number | null = null;

  if (dateParam) {
    const parts = dateParam.split("/");
    const dayStr = parts[0];
    const monthStr = parts[1];
    const yearStr = parts[2];
    
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1; // JS months are 0-11
    
    const now = new Date();
    targetDate = new Date(now.getFullYear(), month, day, 0, 0, 0);
    
    if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
      targetDate.setFullYear(now.getFullYear() + 1);
    }
    
    if (yearStr) {
      const birthYear = parseInt(yearStr, 10);
      age = targetDate.getFullYear() - birthYear;
    }
    
    sharedCharacters = charactersData.filter(char => char.birthDate === `${dayStr}/${monthStr}`);
  } else {
    targetDate.setSeconds(targetDate.getSeconds() + 10);
  }

  return (
    <main className="min-h-screen bg-pastel-cream flex flex-col items-center justify-start font-quicksand relative overflow-hidden p-4 pt-24 pb-16">
      <div className="absolute top-0 w-full p-6 z-20 flex justify-center sm:justify-start">
        <Link href="/" className="inline-flex items-center gap-2 text-pastel-blue hover:text-pink-400 font-bold transition-colors bg-white/70 px-5 py-2 rounded-full backdrop-blur shadow-sm">
          <ArrowLeft size={20} /> Về Trang Chủ
        </Link>
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pastel-pink rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-pastel-blue rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        <CountdownTimer targetDateStr={targetDate.toISOString()} name={decodedName} age={age} />
        
        {sharedCharacters.length > 0 && (
          <div className="mt-24 w-full flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-8 bg-white/70 backdrop-blur px-8 py-3 rounded-full border border-pastel-yellow/50 text-center shadow-sm">
              ✨ Có thể bạn chưa biết: Sinh cùng ngày với {decodedName} có... ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
              {sharedCharacters.map(char => <CharacterCard key={char.id} character={char} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}