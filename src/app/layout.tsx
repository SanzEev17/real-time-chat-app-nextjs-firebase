import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const fontFamily = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guff-Gaf",
  description: "Real time chat app created with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>{children}</body>
    </html>
  );
}
