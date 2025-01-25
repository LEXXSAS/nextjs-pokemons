import { PockemonResults } from "@/main";

interface FilteredPokemon {
  aboveFilteredPokemon: (pokemonList: PockemonResults[], searchqueryparams: string) => PockemonResults[];
}

export const aboveFilteredPokemon: FilteredPokemon["aboveFilteredPokemon"] = function(pokemonList: PockemonResults[], searchqueryparams: string) {
  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchqueryparams.toLowerCase());
  });
  return filteredPokemon;
}
