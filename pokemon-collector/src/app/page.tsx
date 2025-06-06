// src/app/page.tsx
import PokemonCard from '@/components/PokemonCard';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokémon Collector</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Vamos usar dados de exemplo por enquanto */}
        <PokemonCard
          name="bulbasaur"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        />
        <PokemonCard
          name="charmander"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        />
        <PokemonCard
          name="squirtle"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
        />
        <PokemonCard
          name="pikachu"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        />
      </div>
    </main>
  );
}