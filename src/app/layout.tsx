import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import 'highlight.js/styles/atom-one-dark.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-next',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading-next',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono-next',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sedrick James Camiguing | Full-Stack Software Engineer',
  description:
    'Full-stack developer specializing in React, Node.js, and Laravel. I build production-ready administrative systems, clinical workflows, and scalable multi-tenant platforms.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23090d16'/><text y='.75em' x='50%' text-anchor='middle' font-size='60' font-weight='800' font-family='monospace' fill='%2338bdf8'>S</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
