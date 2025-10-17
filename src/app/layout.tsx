import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnimeStream - Watch Anime Online",
  description: "Stream your favorite anime shows and movies online in HD quality. Discover trending anime, browse by genre, and watch the latest episodes.",
  keywords: ["anime", "streaming", "watch anime", "anime online", "HD anime"],
  authors: [{ name: "AnimeStream Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AnimeStream - Watch Anime Online",
    description: "Stream your favorite anime shows and movies online in HD quality",
    url: "https://animestream.com",
    siteName: "AnimeStream",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeStream - Watch Anime Online",
    description: "Stream your favorite anime shows and movies online in HD quality",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
