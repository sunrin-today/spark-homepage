import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContexts";

export const metadata: Metadata = {
  title: "SPARK! 홈페이지",
  description: "학생회 서비스 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}