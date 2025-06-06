// src/components/Header.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          PokéCollector
        </Link>
        <div className="flex items-center gap-4">
          {status === 'loading' ? (
            <div>Carregando...</div>
          ) : session ? (
            <>
              <p>Olá, {session.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}