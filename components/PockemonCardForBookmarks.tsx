"use client";

import { PockemonSingleAllDetails } from "@/main";
import { typeColor } from "@/utils/colors";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "./ui/skeleton";
import { PokemonCardButtons } from "./PokemonCardButtons";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";

interface PokemonCardProps {
  pokemon: PockemonSingleAllDetails;
  setNewBookmarkedPokemon?: any
}

function PockemonCardForBookmarks({ pokemon, setNewBookmarkedPokemon }: PokemonCardProps) {
  const [isImageLoading, setImageLoading] = React.useState(true);

  const userDetails = useStore((state) => state.userDetails);
  const useremail = useStore((state) => state.useremail);

  const {ref, inView} = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const testAddNewPokemonForBookmark = (newpokemonname: string) => {
    if (!useremail) {
      toast.error('Войдите в аккаунт', {
        icon: '❌'
      });
    } else {
      if (userDetails && userDetails?.bookmarks?.some((item: any) => String(item) === newpokemonname)) {
        setNewBookmarkedPokemon((prev: any) => prev.filter((item: {name: string}) => item.name !== newpokemonname));
        toast.error(`Покемон ${newpokemonname} удален из избранного`, {
          icon: '❌'
        });
      } else {
        setNewBookmarkedPokemon((prev: {name: string}[]) => [...prev, {name: newpokemonname}]);
        toast.success(`Покемон ${newpokemonname} добавлен в избранное`, {
          icon: '✅'
        });
      }
    }
  }
  
  return (
    <div ref={ref} id="pockemon-card" className="relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2">
      <div className="h-4"></div>
      
      <PokemonCardButtons key={pokemon?.name} pokemonname={pokemon?.name} pokemon={pokemon} testAddNewPokemonForBookmark={testAddNewPokemonForBookmark} />

      <div id="pokemon-card-info-and-image-container" className="flex gap-4">
        <div id="pokemon-image" className="flex-1">
        {inView ?
          <Image
          priority
          src={
            pokemon?.sprites?.other?.["official-artwork"]?.front_default
          }
          alt="pokemon image"
          style={{ width: "300px", height: "auto" }}
          width={300}
          height={300}
          className={isImageLoading ? "object-contain blur" : "object-contain remove-blur"}
          onLoad={() => setImageLoading(false)}
          />
          :
          <Skeleton className="h-[300px] w-[300px] bg-white" />
        }
        </div>
        <div id="pokemoncard-pokemon-name">
          <p className="text-xs uppercase font-semibold text-gray-500 px-5 py-1">
            {pokemon?.name}
          </p>
        </div>
        <div id="pokemon-info">
          <div className="flex justify-center gap-2">
            {pokemon?.types?.slice(0, 1)?.map((type: any, index: number) => (
              <p
                key={index}
                className="text-xs uppercase font-semibold text-white px-5 py-1"
                style={{ backgroundColor: typeColor[type?.type?.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PockemonCardForBookmarks;
