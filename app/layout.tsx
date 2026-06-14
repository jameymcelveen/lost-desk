import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const pageSerif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-page-serif",
});

export const metadata: Metadata = {
  title: "lost-desk — Open Notebook",
  description: "A desktop you will never lose. The notebook is the only tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pageSerif.variable} bg-desk`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
