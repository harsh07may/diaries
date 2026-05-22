import type { Metadata, Viewport } from 'next';
import { hankenGrotesk, jetbrainsMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Neoblog - My Digital Desk',
  description: 'A bold, interactive personal blog built with neobrutalism.',
};

export const viewport: Viewport = {
  width: 'device-width',
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
      <body className="bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
