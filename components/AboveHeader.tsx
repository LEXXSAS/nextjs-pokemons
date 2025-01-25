'use server';
import { Suspense } from 'react';
import Header from './Header';
import { fetchAllPokemons } from '@/lib/get-all-pokemons';
import PokemonsService from '@/constans/get-service';

export default async function AboveHeader() {

  const allpokemons = await fetchAllPokemons();
  const allpokemonswithdetails = await PokemonsService.fetchAllPokemonsWithDetails(1, 44);

  if (allpokemonswithdetails === null) return;

  return (
    <div>
      <Suspense>
        <Header allpokemons={allpokemons} allpokemonswithdetails={allpokemonswithdetails} />
      </Suspense>
    </div>
  )
}
