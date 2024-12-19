import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://quiz20-a466c.web.app'
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "クイズアプリ",
  description: "学習のためのクイズアプリケーション",
  openGraph: {
    title: 'クイズアプリ',
    description: '学習のためのクイズアプリケーション',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'クイズアプリ プレビュー画像',
      },
    ],
    siteName: 'クイズアプリ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'クイズアプリ',
    description: '学習のためのクイズアプリケーション',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
