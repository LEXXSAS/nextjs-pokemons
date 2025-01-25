"use client";

import React, { useEffect } from "react";
import PokemonsService from "@/constans/get-service";
import PokemonCardForFavourites from "@/components/PockemonCardForFavourites";
import { useStore } from "@/store/useStore";

function Favourites() {
  const userDetails = useStore((state) => state.userDetails);
  const setNewPokemonLike = useStore((state) => state.setNewPokemonLike);

  const [newpokemon, setNewPokemon] = React.useState([{name: ''}]);
  const [newpokemonforbookmark, setNewPokemonForBookmark] = React.useState([{name: ''}]);
  const [likedPokemons, setLikedPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setNewPokemonLike(newpokemon);
  }, [newpokemon])

  useEffect(() => {
    if (userDetails?.liked) {
      setLoading(true);
      const fetchPokemons = async () => {
        const pokemonDetails = await Promise.all(
          userDetails.liked.map(async (pokemon: any) => {
            const details = await PokemonsService.fetchPokemonByName(pokemon);

            return details;
          })
        );

        setLikedPokemons(pokemonDetails as any);
      };
      setLoading(false);
      fetchPokemons();
    }
  }, [userDetails?.liked]);

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
          {userDetails && userDetails?.liked.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {likedPokemons.map((pokemon: any, index: number) => (
                <PokemonCardForFavourites key={pokemon.name + index} pokemon={pokemon} setNewPokemon={setNewPokemon} setNewPokemonForBookmark={setNewPokemonForBookmark} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No liked pokemons
            </h2>
          )}
        </section>
      )}
    </main>
  );
}

export default Favourites;
