// @ts-nocheck
'use client'

import { fetchPokemons } from '@/lib/get-offset-pokemons';
import { PockemonSingleAllDetails } from '@/main';
import { useStore } from '@/store/useStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import Select from 'react-select';

interface IValue {
  value: string;
  label: string;
}

export const SelectComponent = () => {
  const [isSearchable, setIsSearchable] = React.useState(true);

  const pokemonListDetails = useStore((state) => state.pokemonListDetails);
  const pokemonList = useStore((state) => state.pokemonList);
  const setPokemonListDetails = useStore((state) => state.setPokemonListDetails);
  const setPokemonList = useStore((state) => state.setPokemonList);
  const setOriginalTypes = useStore((state) => state.setOriginalTypes);
  const setSearchTrigger = useStore((state) => state.setSearchTrigger);
  const setTypeValue = useStore((state) => state.setTypeValue);
  const originaltypes = useStore((state) => state.originaltypes);
  const typeValue = useStore((state) => state.typeValue);
  const types: PockemonSingleAllDetails[] = useStore((state) => state.types);
  const setTotalPage = useStore((state) => state.setTotalPage);
  const pageQty = useStore((state) => state.pageQty);
  const setSelectedActive = useStore((state) => state.setSelectedActive);
  const setPage = useStore((state) => state.setPage);
  const page = useStore((state) => state.page);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';

  const filteredPokemonsByType = async() => {
    if (typeValue) {
      let filteredPokemon = [];
      filteredPokemon = types.filter((pokemon) => {
        return pokemon.types.some((t) => t.type.name === String(typeValue.value));
      });
      if (!filteredPokemon.length || typeValue.value === 'Выбор типа') {
        setSelectedActive(false)
      }
      else {
        if (searchParams?.get('query') && !filteredPokemon.length) {
          const params = new URLSearchParams(searchParams);
          params.set('page', '1');
          params.delete('query');
          router.replace('/?page=1');
        }
        setSelectedActive(true)
        setTotalPage(1)
        setPokemonListDetails(filteredPokemon);
      }
    }
  }
  
  const fetchAgain = async() => {
    const res = await fetchPokemons(searchParams.get('page') ? Number(searchParams.get('page')) : 1)
    res && setPokemonListDetails(res?.pokemonDetails);
  }

  const fetchAgainWithQuery = async() => {
    const res = await fetchPokemons(page)
    res && setPokemonListDetails(res?.pokemonDetails);
  }

  useEffect(() => {
    let originalArr = types.map((item) => item.types.map((item) => item.type.name));
    setOriginalTypes(originalArr);
  }, [types])

  useEffect(() => {
    if (typeValue.value !== 'Выбор типа') {
      filteredPokemonsByType()
    }
    // else if (typeValue.value === 'Выбор типа' && query !== '') {
    //   const params = new URLSearchParams(searchParams);
    //   params.set('page', '1');
    //   params.delete('query');
    //   router.replace('/?page=1');
    // }
    // else if (typeValue.value === 'Выбор типа' && query === '') {
    else if (typeValue.value === 'Выбор типа') {
      // console.log('%cim here', 'color: red');

      setSelectedActive(false)
      fetchAgain()
      pokemonList && setTotalPage(Math.ceil(pokemonList.length / pageQty));
    }
    else if (typeValue.value === 'Выбор типа' && query !== '') {
      fetchAgainWithQuery()
    }
  }, [typeValue])

  const getTypesToArray = () => {

    let newSetArr = Array.from(new Set(originaltypes.flat()));
    let typesArray = [{value: 'Выбор типа', label: 'Выбор типа'}]

    newSetArr.map((item) => 
    typesArray.push({value: `${item}`, label: `${item}`})
    )
    return typesArray
  }

  const testValues = [{value: 'Выбор типа', label: 'Выбор типа'}, {value: 'Water', label: 'Water'}, {value: 'Wind', label: 'Wind'}];

  const setSelected = (value: IValue) => {
    setTypeValue(value)
  }

  useEffect(() => {
    return () => {
      setTypeValue({value: 'Выбор типа', label: 'Выбор типа'})
    }
  }, [pathname])

  return (
    
    <div className="select-container mt-3">
    <div id="selectid" className="select-author form-select px-2 py-1 transition-all  appearance-none invalid:text-black/30 w-64">
    <Select
    id="long-value-select" instanceId="long-value-select"
    theme={(theme) => ({
      ...theme,
      borderRadius: '5px',
      colors: {
        ...theme.colors,
        primary: 'rgb(199 210 254)',
      },
    })}
     options={types.length < 0 ? typeValue : getTypesToArray()} 
     className='basic-single'
     value={typeValue}
     defaultValue={typeValue}
     isSearchable={isSearchable}
     name='select'
     placeholder='Выбор типа'
     onChange={(value, actionMeta) => value && setSelected(value)}
    />
    </div>

    {/* <div id="selectidtwo" className="form-selectpx-2 py-1 transition-all appearance-none invalid:text-black/30 w-64">
    </div> */}
  </div>
  )
}
