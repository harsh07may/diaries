import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  weight: ['400', '500', '700', '800', '900'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});
