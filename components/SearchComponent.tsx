'use client';

import { aboveFilteredPokemon } from "@/constans/filtered-pokemon";
import PokemonsService from "@/constans/get-service";
import { PockemonResults, PockemonSingleAllDetails } from "@/main";
import { useStore } from "@/store/useStore";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchComponent({ placeholder }: { placeholder: string }) {
  const [search, setSearch] = useState('');

  const setPokemonList = useStore((state) => state.setPokemonList);
  const setPokemonListDetails = useStore((state) => state.setPokemonListDetails);
  const pokemonList = useStore((state) => state.pokemonList);
  const setLoad = useStore((state) => state.setLoad);
  const setKeyData = useStore((state) => state.setKeyData);
  const keydata = useStore((state) => state.keydata);
  const setNodata = useStore((state) => state.setNodata);
  const setTotalPage = useStore((state) => state.setTotalPage);
  const loadingtime = useStore((state) => state.loadingtime);
  const pageQty = useStore((state) => state.pageQty);
  const setTypeValue = useStore((state) => state.setTypeValue);
  const typeValue = useStore((state) => state.typeValue);
  const setFilteredSearch = useStore((state) => state.setFilteredSearch);
  const setSearchTrigger = useStore((state) => state.setSearchTrigger);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const pathname = usePathname();
  const {replace} = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeValue.value !== 'Выбор типа') {
      inputRef!.current!.value = '';
      setSearch('');
    }
  }, [typeValue])

  useEffect(() => {
    if (query && query !== '' && pokemonList && pokemonList.length !== 0) {
      // setTotalPage(1)
    }
    else {
      pokemonList && setTotalPage(Math.floor(Number(pokemonList.length / pageQty)));
    }
  }, [query, pokemonList])

  useEffect(() => {
    if (!query) {
      inputRef!.current!.value = '';
    }
    else if (query && query !== '' && search === '') {
      handleSearchContainer(query);
    } 
  }, [query])


  const searchPokemons = async(filteredPokemon: PockemonResults[]) => {
    setTypeValue({value: 'Выбор типа', label: 'Выбор типа'})
    console.log('=== ищем покемона ===')
    try {
      setLoad(true)
      setNodata(false);
      setTimeout(async() => {
        setNodata(filteredPokemon.length === 0 ? true : false);
        const res: PockemonSingleAllDetails[] | null = await PokemonsService.searchPokemon(filteredPokemon);
        if (!res) return;
        setPokemonListDetails(res);
        setLoad(false)
        return res;
      }, loadingtime)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearchKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      return;
    }
  }

  const handleSearchContainer = (term: string) => {
    if (pathname === '/') {
      setSearch(term);
      handleSearch(term)
    } else if (pathname === '/' && term.length === 0) {
      setSearch('');
      setPokemonList!([])
    }
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    if (keydata === 'Backspace') {
      return
    }
      const params = new URLSearchParams(searchParams);

      // params.set('page', '1');

      if (term && inputRef!.current!.value !== '') {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);

      if (term.length > 0 && term && inputRef!.current!.value !== '') {
        const filteredPokemon = aboveFilteredPokemon(pokemonList as PockemonResults[], params.get('query')?.toString() || '');
        console.log('filteredPokemon', filteredPokemon)
        setFilteredSearch(filteredPokemon);
        searchPokemons(filteredPokemon);
        setTotalPage(Math.ceil(filteredPokemon.length / pageQty));
      }

  }, 300);

  return (
    <div id="search-component" className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearchContainer(e.target.value);
          setSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        ref={inputRef}
        onKeyUp={(e) => {handleSearchKeyUp(e); setKeyData(e.key)}}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
