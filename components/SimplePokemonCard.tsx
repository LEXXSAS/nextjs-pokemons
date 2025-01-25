'use client'

import { PockemonSingleAllDetails } from '@/main';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useInView } from 'react-intersection-observer';
import { Skeleton } from './ui/skeleton';

interface PokemonCardProps {
  pokemon: PockemonSingleAllDetails;
}

export const SimplePokemonCard = ({pokemon}: PokemonCardProps) => {
  const [isImageLoading, setImageLoading] = React.useState(true)

  const router = useRouter();

  const {ref, inView} = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <div ref={ref} id="pockemon-card" className="relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2">
    <h2 className="text-5xl font-bold">{pokemon?.name}</h2>
    {inView ?
    <img
    onLoad={() => setImageLoading(false)}
    loading="lazy"
    width={300}
    height={300}
    src={pokemon?.sprites.other["official-artwork"].front_default}
    alt={pokemon?.name}
    className={isImageLoading ? "object-contain blur" : "object-contain remove-blur"}
    />
    :
    <Skeleton className="w-[300px] h-[300px]" />
    }
    </div>
  )
}
