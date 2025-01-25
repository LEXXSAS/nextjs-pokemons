'use client';

import { PockemonSingleAllDetails } from '@/main';
import { typeColor } from '@/utils/colors';
import React from 'react'

interface PokemonCardProps {
  pokemon: PockemonSingleAllDetails;
}

export const PokemonCardInfo = ({pokemon}: PokemonCardProps) => {
  return (
    <div id="pokemon-info" className="flex-1 flex flex-col items-center justify-center gap-4">
    <div className="mb-2 flex gap-2">
      <p className="text-xs uppercase font-semibold text-gray-500">
        {pokemon?.height} m,
      </p>
      <p className="text-xs uppercase font-semibold text-gray-500">
        {pokemon?.weight} kg,
      </p>
      <p className="text-xs uppercase font-semibold text-gray-500">
        {pokemon?.base_experience} xp
      </p>
    </div>
    <h2 className="text-2xl text-gray-800 capitalize font-bold text-center">
      {pokemon?.name}
    </h2>

    <div className="flex justify-center gap-2">
      {pokemon?.types?.map((type: any, index: number) => (
        <p
          key={index}
          className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
          style={{ backgroundColor: typeColor[type?.type?.name] }}
        >
          {type.type.name}
        </p>
      ))}
    </div>
  </div>
  )
}
