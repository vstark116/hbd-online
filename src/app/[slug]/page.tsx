import GiftBox from "@/components/GiftBox";
import Envelope from "@/components/Envelope";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const runtime = 'edge';

export default async function DynamicGiftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  if (!slug || slug === "create-gift" || slug === "create-countdown") return notFound();

  const { data: gift, error } = await supabase
    .from('gifts')
    .select('*')
    .eq('id', slug)
    .single();

  if (error || !gift) {
    return (
      <main className="min-h-screen bg-pastel-cream flex flex-col items-center justify-center p-4 text-center font-quicksand">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Ối! Lỗi 404! 🎁</h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">Món quà này không tồn tại hoặc tên miền chưa chính xác!</p>
        <Link href="/" className="bg-pastel-blue px-6 py-3 rounded-full font-bold text-gray-800 hover:bg-blue-300 transition-colors shadow-sm">
          Trở Về Trang Chủ Tạo Quà Mới
        </Link>
      </main>
    );
  }

  // Determine message logic from DB
  let finalMessage = gift.message || "";
  
  if (gift.style && !finalMessage) {
    if (gift.style === "Doraemon") {
      finalMessage = `Chào ${gift.recipient}! Tớ là Doraemon đây! Tớ vừa lục bảo bối lấy ra món quà này cho cậu, chúc cậu sinh nhật vui vẻ nhé!`;
    } else if (gift.style === "Gojo Satoru") {
      finalMessage = `Yo ${gift.recipient}! Chúc mừng sinh nhật nha. Cậu biết không, dù cậu có mạnh đến đâu thì cũng không bằng tớ đâu haha, đùa thôi! Quà này!`;
    } else if (gift.style === "Hài hước") {
      finalMessage = `Sinh nhật vui vẻ nha ${gift.recipient}! Thêm một tuổi mới mong bạn bớt ngáo ngơ và nhanh giàu để còn bao tôi ăn!`;
    } else {
      finalMessage = `Chúc mừng sinh nhật ${gift.recipient}! Mong tuổi mới của bạn sẽ tràn ngập tiếng cười và những điều bất ngờ thú vị!`;
    }
  }

  const theme = gift.theme || "pink";
  const bgColor1 = theme === "blue" ? "bg-pastel-blue" : theme === "yellow" ? "bg-pastel-yellow" : "bg-pastel-pink";
  const bgColor2 = theme === "blue" ? "bg-blue-100" : theme === "yellow" ? "bg-yellow-100" : "bg-pink-100";

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center font-quicksand relative overflow-hidden p-4 ${theme === 'blue' ? 'bg-[#f4faff]' : theme === 'yellow' ? 'bg-[#fffdf7]' : 'bg-pastel-cream'}`}>
      <div className="absolute top-0 w-full p-6 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-pastel-blue hover:text-pink-400 font-bold transition-colors bg-white/70 px-4 py-2 rounded-full backdrop-blur shadow-sm">
          <ArrowLeft size={20} /> Về Trang Chủ
        </Link>
      </div>
      
      <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] ${bgColor1} rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse`}></div>
      <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] ${bgColor2} rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse`} style={{ animationDelay: '1s' }}></div>
      
      {slug.includes("-card-") ? (
        <Envelope 
          title={`Từ ${gift.sender} gửi ${gift.recipient}`} 
          message={finalMessage} 
          photoUrl={gift.image_url || undefined} 
          musicUrl={gift.music || undefined} 
        />
      ) : (
        <GiftBox 
          sender={gift.sender} 
          message={finalMessage} 
          imageUrl={gift.image_url} 
          music={gift.music} 
          theme={theme} 
        />
      )}
    </main>
  );
}
