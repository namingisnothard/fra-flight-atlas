import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fra-flight-atlas.xulinning0522.chatgpt.site'),
  title: 'FRA Flight Atlas',
  description: 'Explore nonstop arrivals and departures at Frankfurt Airport on an interactive world map.',
  openGraph: {
    title: 'FRA Flight Atlas',
    description: "Frankfurt's nonstop network, mapped.",
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FRA Flight Atlas',
    description: "Frankfurt's nonstop network, mapped.",
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
