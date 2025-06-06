// src/components/PokemonCard.tsx
import Image from 'next/image';

// Definindo a "forma" dos dados do Pokémon com TypeScript
interface PokemonCardProps {
  name: string;
  imageUrl: string;
}

export default function PokemonCard({ name, imageUrl }: PokemonCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col items-center bg-gray-50 hover:scale-105 transition-transform">
      <Image
        src={imageUrl}
        alt={`Image of ${name}`}
        width={96}
        height={96}
        className="w-24 h-24"
      />
      <h2 className="text-xl font-bold capitalize mt-2">{name}</h2>
    </div>
  );
}