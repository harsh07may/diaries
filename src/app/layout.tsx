import type { Metadata, Viewport } from "next";
import { hankenGrotesk, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://kanaka-pages.vercel.app"
      : "http://localhost:3000"
  ),
  title: {
    default: "kanaka.pages - My Digital Desk",
    template: "%s | kanaka.pages",
  },
  description: "A bold, interactive personal blog built with neobrutalism.",
  openGraph: {
    title: "kanaka.pages - My Digital Desk",
    description: "A bold, interactive personal blog built with neobrutalism.",
    url: "/",
    siteName: "kanaka.pages",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kanaka.pages - My Digital Desk",
    description: "A bold, interactive personal blog built with neobrutalism.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
