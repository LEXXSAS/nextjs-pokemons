'use client';

import { useUserData } from '@/constans/user-data';
import { PockemonSingleAllDetails } from '@/main';
import { useStore } from '@/store/useStore';
import { ArrowRight, Bookmark, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PokemonCardProps {
  pokemon: PockemonSingleAllDetails;
  testAddNewPokemonForLike?: (name: string) => void;
  testAddNewPokemonForBookmark?: (name: string) => void;
  pokemonname: string
}

export const PokemonCardButtons = ({pokemonname, pokemon, testAddNewPokemonForLike, testAddNewPokemonForBookmark}: PokemonCardProps) => {
  const router = useRouter();

  const {performAction} = useUserData();
  const useremail = useStore((state) => state.useremail);
  const likedpokemons = useStore((state) => state.likedpokemons);
  const bookmarkedpokemons = useStore((state) => state.bookmarkedpokemons);

  return (
    <div data-btn-name={pokemon?.name} className="flex justify-between items-center">
    <div className="flex gap-4 bg-white rounded-tl-xl rounded-tr-xl">
      <button
        onClick={() => {performAction(useremail, pokemon?.name, "like"); testAddNewPokemonForLike && testAddNewPokemonForLike(pokemonname)}}
        id={likedpokemons.some((item) => String(item) === pokemon?.name) ? 'like-button-one' : 'like-button-one-not-active'}
        className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2
          `}
      >
        {likedpokemons.some((item) => String(item) === pokemon?.name) ? <Heart color="#e74c3c" fill="#e74c3c" /> : <Heart className="heart-icon-one" />}
        
      </button>
      <button
        onClick={() => {performAction(useremail, pokemon?.name, "bookmark"); testAddNewPokemonForBookmark && testAddNewPokemonForBookmark(pokemonname)}}
        id={bookmarkedpokemons.some((item) => String(item) === pokemon?.name) ? 'like-button-two' : 'like-button-two-not-active'}
        className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2
          `}
        >
        {bookmarkedpokemons.some((item) => String(item) === pokemon?.name) ? <Bookmark color="#00b894" fill="#00b894" /> : <Bookmark className="bookmark-icon" />}
      </button>
    </div>

    <button
      id="like-button-three"
      className="p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-300 border-gray-300
     "
      onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
    >
      <ArrowRight className="arrow-right-icon" />
    </button>
  </div>
  )
}
