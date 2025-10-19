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
  title: "Kimono - Your Ultimate Anime Platform",
  description: "Discover, watch, and track your favorite anime shows and movies. Browse by genre, get recommendations, and build your personal anime collection.",
  keywords: ["anime", "kimono", "anime platform", "watch anime", "anime online", "anime collection"],
  authors: [{ name: "Kimono Team" }],
  icons: {
    icon: "/kimono-logo.svg",
  },
  openGraph: {
    title: "Kimono - Your Ultimate Anime Platform",
    description: "Discover, watch, and track your favorite anime shows and movies",
    url: "https://kimono-anime.com",
    siteName: "Kimono",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimono - Your Ultimate Anime Platform",
    description: "Discover, watch, and track your favorite anime shows and movies",
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
