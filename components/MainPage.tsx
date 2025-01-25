'use client';

import { spinner } from "@/components/spinner";
import { PockemonSingleAllDetails } from "@/main";
import { useStore } from "@/store/useStore";
import { noDataSearchAll } from "@/utils/no-data-info";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import React from "react";
import PokemonCard from "@/components/PockemonCard";

interface PropsMainPage {
  offsetpokemon?: PockemonSingleAllDetails[] | null;
  pagefromoffset?: number;
  test?: number;
}

export default function MainPage({offsetpokemon, pagefromoffset, test}: PropsMainPage) {
  const filteredsearch = useStore((state) => state.filteredsearch);
  const setLoad = useStore((state) => state.setLoad);
  const loading = useStore((state) => state.loading);
  const pokemonListDetails = useStore((state) => state.pokemonListDetails);
  const setPokemonListDetails = useStore((state) => state.setPokemonListDetails);
  const setPage = useStore((state) => state.setPage);
  const page = useStore((state) => state.page);
  const nodata = useStore((state) => state.nodata);
  const setNodata = useStore((state) => state.setNodata);
  const selectedactive = useStore((state) => state.selectedactive);
  const searchtrigger = useStore((state) => state.searchtrigger);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setNodata(false)
    if (offsetpokemon && pagefromoffset && searchParams.size < 2 && pathname === '/') {
      setPokemonListDetails(offsetpokemon);
      if (String(pagefromoffset) !== '') {
        setPage(pagefromoffset);
      }
    }
  }, [offsetpokemon, pagefromoffset])

  useEffect(() => {
    console.log('%cpage number from server =>', 'color: green', test)
  }, [test])

  useEffect(() => {
    if (!test) {
      setLoad(false)
    }
    else if (page !== test) {
      setLoad(true)
    }
    else {
      setTimeout(() => {
        setLoad(false)
      }, 150)
    }
  }, [page])

  const [newpokemonforlike, setNewPokemonForLike] = useState([{name: ''}]);
  const [newpokemonforbookmark, setNewPokemonForBookmark] = useState([{name: ''}]);
  const setNewPokemonLike = useStore((state) => state.setNewPokemonLike);

  useEffect(() => {
    setNewPokemonLike(newpokemonforlike);
  }, [newpokemonforlike])

  return (
    <main>
      <section id='search-section' className="mt-10 flex items-center justify-center">
      </section>

      <section>
      </section>
      {/* {!selectedactive && searchParams.size < 2 && pokemonListDetails && pokemonListDetails.length > 0 && ( */}
      {pokemonListDetails && pokemonListDetails.length > 0 && (
        <>
        <PaginationComponent />
        </>
      )}
      <section className="min-h-[91vh]">
        <div id="pockemons-section" className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? spinner() : null}
          {!loading && filteredsearch?.length === 0 && pokemonListDetails?.length === 0 && nodata ? noDataSearchAll() : null}
          {!loading && pokemonListDetails && pokemonListDetails?.length > 0 &&
            pokemonListDetails.map((pokemon: PockemonSingleAllDetails, index: number) => {
              return (
                <PokemonCard key={index} pokemon={pokemon} setNewPokemonForLike={setNewPokemonForLike} setNewPokemonForBookmark={setNewPokemonForBookmark} />
                );
              })
            }
        </div>
      </section>
    </main>
  );
}
