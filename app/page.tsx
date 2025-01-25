'use server';
import MainPage from "@/components/MainPage";
import { fetchPokemons } from "@/lib/get-offset-pokemons";
import { Suspense } from "react";

interface Params {
  page?: number;
  query?: string;
}

export default async function Home({searchParams}: {searchParams: Params}) {

  const offsetpokemons= await fetchPokemons(searchParams.page || 1);

  if (offsetpokemons === null) return;
  
  return (
    <Suspense key={searchParams.page}>
      <MainPage test={searchParams.page} offsetpokemon={offsetpokemons?.pokemonDetails} pagefromoffset={offsetpokemons?.page} />
    </Suspense>
  )
}
