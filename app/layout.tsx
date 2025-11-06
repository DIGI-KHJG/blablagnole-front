import { AppProviders } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "sonner";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blablagnole",
  description: "Blablagnole",
  icons: {
    icon: "/bbgl-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
