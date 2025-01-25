import SinglePockemon from "@/components/SinglePokemon";
import PokemonsService from "@/constans/get-service";
import { PockemonResults, PockemonSingleAllDetails } from "@/main";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const pokemons =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pokemon?limit=1118`)
  .then((res) => res.json());

  return pokemons.results.slice(0, 2).map((pokemon: PockemonResults) => ({
    slug: pokemon.name
  }))
}

export default async function Pokemon({
  params
}: {
  params: {slug: string}
}) {
  const {slug} = params;

  const activePockemon: PockemonSingleAllDetails | null = await PokemonsService.fetchPokemonByName(slug);

  if (!activePockemon) {
    return notFound();
  }

  if (activePockemon?.name.length === 0) {
    return notFound();
  }

  return (
    <>
    <SinglePockemon activePokemon={activePockemon} />
    </>
  )
}
