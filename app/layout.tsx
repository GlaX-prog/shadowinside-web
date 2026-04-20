import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { TopNav } from "@/components/layout/TopNav";
import { ScrollRail } from "@/components/layout/ScrollRail";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shadowinside.vercel.app"
  ),
  title: "Shadow Inside — Italian Metalcore",
  description:
    "Shadow Inside — Italian metalcore. Loud, blue, bright. Tour dates, songs, merch, and everything loud.",
  openGraph: {
    title: "Shadow Inside",
    description: "Loud. Blue. Bright.",
    images: ["/images/gallery-3.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadow Inside",
    description: "Loud. Blue. Bright.",
    images: ["/images/gallery-3.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--void)] text-[var(--ice)]">
        <LenisProvider>
          <CustomCursor />
          <TopNav />
          <ScrollRail />
          <main className="relative">{children}</main>
          <Toaster
            theme="dark"
            position="bottom-center"
            toastOptions={{
              style: {
                background: "var(--panel)",
                border: "1px solid rgba(31,182,255,0.35)",
                color: "var(--ice)",
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
