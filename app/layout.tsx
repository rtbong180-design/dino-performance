import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DINO — CAN BE STRONG",
  description: "도전하고, 성장하고, 강인함을 증명하는 사람을 위한 DINO 퍼포먼스 웨어.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
