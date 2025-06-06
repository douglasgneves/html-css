// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokémon Collector',
  description: 'Collect and battle Pokémon!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider é um Client Component, então ele precisa ficar aqui */}
        <AuthProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main> {/* É uma boa prática envolver o conteúdo principal com uma tag <main> */}
        </AuthProvider>
      </body>
    </html>
  );
}