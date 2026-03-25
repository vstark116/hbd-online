import GiftBox from "@/components/GiftBox";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const runtime = 'edge';

export default async function GiftPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  
  const to = resolvedSearchParams.to ? String(resolvedSearchParams.to) : "Bạn hiền";
  const from = resolvedSearchParams.from ? String(resolvedSearchParams.from) : "Người Bạn Bí Ẩn";
  const style = resolvedSearchParams.style ? String(resolvedSearchParams.style) : "Ngọt ngào";
  const msgParam = resolvedSearchParams.msg ? String(resolvedSearchParams.msg) : null;
  const imgUrl = resolvedSearchParams.img ? String(resolvedSearchParams.img) : null;
  const bgm = resolvedSearchParams.bgm ? String(resolvedSearchParams.bgm) : "none";
  let theme = resolvedSearchParams.theme ? String(resolvedSearchParams.theme) : "pink";
  
  let mockMessage = `Chúc mừng sinh nhật ${to}! Mong tuổi mới của bạn sẽ tràn ngập tiếng cười và những điều bất ngờ thú vị!`;
  
  if (msgParam) {
    try {
      mockMessage = Buffer.from(msgParam, 'base64').toString('utf-8');
    } catch {
      mockMessage = "Lỗi giải mã lời chúc! Nhưng vẫn chúc bạn Sinh Nhật Vui Vẻ!";
    }
  } else {
    if (style === "Doraemon") {
      mockMessage = `Chào ${to}! Tớ là Doraemon đây! Tớ vừa lục bảo bối lấy ra món quà này cho cậu, chúc cậu sinh nhật vui vẻ nhé!`;
    } else if (style === "Gojo Satoru") {
      mockMessage = `Yo ${to}! Chúc mừng sinh nhật nha. Cậu biết không, dù cậu có mạnh đến đâu thì cũng không bằng tớ đâu haha, đùa thôi! Quà này!`;
    } else if (style === "Hài hước") {
      mockMessage = `Sinh nhật vui vẻ nha ${to}! Thêm một tuổi mới mong bạn bớt ngáo ngơ và nhanh giàu để còn bao tôi ăn!`;
    }
  }

  // Theme colors
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
      
      <GiftBox sender={from} message={mockMessage} imageUrl={imgUrl} music={bgm} theme={theme} />
    </main>
  );
}