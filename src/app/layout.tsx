import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magiu.vercel.app"),
  title: {
    default: "Magiu — Soluzioni digitali su misura",
    template: "%s · Magiu",
  },
  description:
    "Magiu progetta e realizza siti web, applicazioni e strategie digitali per far crescere la tua attività.",
  keywords: ["Magiu", "sviluppo web", "Next.js", "applicazioni", "design"],
  openGraph: {
    title: "Magiu — Soluzioni digitali su misura",
    description:
      "Magiu progetta e realizza siti web, applicazioni e strategie digitali per far crescere la tua attività.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
