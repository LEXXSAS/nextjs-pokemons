import { PockemonList, PockemonResults, PockemonSingleAllDetails } from "@/main";

const loadingtime: number = 250;

export default class PokemonsService {
  static async fetchPokemonByName(name: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pokemon/${name}`, {
        next: {
          revalidate: 10
        }
      });
  
      if (!res.ok) return null;
      const pokemonbyname = await res.json();
      return pokemonbyname;
    } catch (error: unknown) {
      return null
    }
  };

  static async searchPokemon(pokemonlist: PockemonResults[]) {
    try {
      const details = await Promise.all(
        pokemonlist.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      return details;
    } catch (error: unknown) {
      return null
    }
  }
  static async fetchPokemonDetails(pokemons: PockemonList) {
    try {
      const details = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      return details;
    } catch (error: unknown) {
      return null
    }
  }

  static async fetchPokemons(page: number): Promise<{pokemonDetails: PockemonSingleAllDetails[] | null, page: number} | null> {
    try {
      const limit = 4;
      const offset = (page - 1) * 4;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );
        
      if (!res.ok) return null;
      console.log(
        "🚀 %crevalidate", 'color: #9980FF', res.url.length)
      const pokemons = await res.json();
      const pokemonDetails: PockemonSingleAllDetails[] | null = await this.fetchPokemonDetails(pokemons);
      return {pokemonDetails, page: page};

    } catch (error: unknown) {
      return null
    }
  }
  static async fetchAllPokemonsWithDetails(page: number, limit?: number): Promise<{pokemonDetails: PockemonSingleAllDetails[] | null, page: number} | null> {
    try {
      if (!limit) limit = 4;
      const offset = (page - 1) * 4;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );
        
      if (!res.ok) return null;
      const pokemons = await res.json();
      const pokemonDetails: PockemonSingleAllDetails[] | null = await this.fetchPokemonDetails(pokemons);
      console.log('🛸 fetchAllPokemonsWithDetails', pokemonDetails?.length)
      return {pokemonDetails, page: page};

    } catch (error: unknown) {
      return null
    }
  }

  static async fetchAllPokemons() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pokemon?limit=44`, {
        // next: {
        //   revalidate: 15
        // }
      });
      if (!res.ok) return null;
      const allpockemons: PockemonList = await res.json();
      return allpockemons;
      // console.log(
      //   "🚀", allpockemons.results.length
      // )
    } catch (error) {
      console.error(error);
    }
  }
}
