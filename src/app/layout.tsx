import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Noman | Full-Stack Web Developer",
  description:
    "Portfolio of Md. Abdullah Al Noman Khan, a CSE undergraduate and full-stack web developer building modern web applications and management systems.",
  openGraph: {
    title: "Noman | Full-Stack Web Developer",
    description:
      "Modern full-stack portfolio featuring projects, experience, tools, and contact information.",
    type: "website",
    siteName: "Noman Portfolio"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
