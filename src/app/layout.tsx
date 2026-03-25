import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Birthday Universe - Tra Cứu & Quà Tặng Sinh Nhật Ảo",
  description: "Khám phá xem ai sinh cùng ngày với bạn, tạo bộ đếm ngược sinh nhật cá nhân và gửi hộp quà ảo đầy bất ngờ tích hợp AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${quicksand.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 selection:bg-pastel-pink/40 bg-pastel-cream text-gray-800">
        {children}
      </body>
    </html>
  );
}