"use client";

import React, { useEffect } from "react";
import PokemonsService from "@/constans/get-service";
import { useStore } from "@/store/useStore";
import PockemonCardForBookmarks from "@/components/PockemonCardForBookmarks";

function Bookmarks() {
  const userDetails = useStore((state) => state.userDetails);
  const setNewPokemonOnStoreForBookmark = useStore((state) => state.setNewPokemonForBookmark);

  const [newpokemonforbookmark, setNewBookmarkedPokemon] = React.useState([{name: ''}]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setNewPokemonOnStoreForBookmark(newpokemonforbookmark);
  }, [newpokemonforbookmark])

  useEffect(() => {
    if (userDetails?.bookmarks) {
      setLoading(true);
      const fetchPokemons = async () => {
        const pokemonDetails = await Promise.all(
          userDetails.bookmarks!.map(async (pokemon: any) => {
            const details = await PokemonsService.fetchPokemonByName(pokemon);

            return details;
          })
        );

        setBookmarkedPokemons(pokemonDetails as any);
      };
      setLoading(false);
      fetchPokemons();
    }
  }, [userDetails?.bookmarks]);

  if (loading && userDetails) {
    return (
      <div className="text-center text-2xl font-bold p-4">Loading...</div>
    )
  } else if (!userDetails) {
    return (
      <div className="text-center text-2xl font-bold p-4">Вы не авторизованы</div>
    )
  }

  return (
    <main>
      {!loading && (
        <section className="min-h-[91vh]">
          {userDetails && userDetails.bookmarks!.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookmarkedPokemons.map((pokemon: any, index: number) => (
                <PockemonCardForBookmarks key={pokemon.name + index} pokemon={pokemon} setNewBookmarkedPokemon={setNewBookmarkedPokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No bookmarked pokemons
            </h2>
          )}
        </section>
      )}
    </main>
  );
}

export default Bookmarks;
