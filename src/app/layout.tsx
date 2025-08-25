import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: 'Mi Casa Mágica con WebSockets',
  description: 'Un proyecto en tiempo real para aprender sobre WebSockets.',
  openGraph: {
    title: 'Mi Casa Mágica',
    description: 'Comunícate en tiempo real con WebSockets.',
    url: 'https://tu-sitio.com',
    siteName: 'Mi Casa Mágica',
    images: [
      {
        url: 'https://tu-sitio.com/open-graph-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
