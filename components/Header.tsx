'use client';

import { Bookmark, Heart, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from 'next-auth/react';
import SearchComponent from './SearchComponent';
import { useStore } from '@/store/useStore';
import { Button } from './ui/button';
import { IAllPokemonsAndPage, PockemonResults } from '@/main';
import { SelectComponent } from './SelectComponent';
import { useUserData } from "@/constans/user-data";

interface PropsHeader {
  allpokemons?: PockemonResults[] | undefined;
  allpokemonswithdetails?: IAllPokemonsAndPage | undefined
}

export default function Header({ allpokemons, allpokemonswithdetails }: PropsHeader) {
  const [sub, setSub] = React.useState('');
  const [userImage, setUserImage] = React.useState('');
  const [name, setName] = React.useState<string | null | undefined>('');
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);

  const pokemonListDetails = useStore((state) => state.pokemonListDetails);
  const page = useStore((state) => state.page);
  const totalPageDefault = useStore((state) => state.totalPageDefault);
  const totalPage = useStore((state) => state.totalPage);
  const nodata = useStore((state) => state.nodata);
  const setPokemonList = useStore((state) => state.setPokemonList);
  const setTypes = useStore((state) => state.setTypes);
  const setUserEmail = useStore((state) => state.setUserEmail);
  const setUserDetails = useStore((state) => state.setUserDetails);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';

  const { fetchUserDetails } = useUserData();

  const router = useRouter();

  useEffect(() => {
    if (allpokemons) {
      setPokemonList(allpokemons);
    }
  }, [allpokemons])

  useEffect(() => {
    if (allpokemonswithdetails) {
      allpokemonswithdetails.pokemonDetails && setTypes(allpokemonswithdetails.pokemonDetails)
    }
  }, [allpokemonswithdetails])

  const getUserDataFromDb = async(data: string) => {
    const resuserdata = await fetchUserDetails(data);
    resuserdata && setUserDetails(resuserdata);
  }

  useEffect(() => {
    setSub('');
    if (status === 'loading') {

    }
    if (status === 'authenticated') {
      if (data?.user) {
        setUserEmail(data.user.email || '');
        setSub(data.user.email || '');
        setName(data.user.name || '');
        setUserImage(data.user.image || '');
        data.user.email && getUserDataFromDb(data.user.email)
        setIsLoading(false);
      }
    }
  }, [data, status]);

  const user = {
    sub: sub,
    name: name,
    picture: userImage,
  }

  const menu = [
    {
      name: "Browse",
      link: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Favorites",
      link: "/favourites",
      icon: <Heart size={22} />,
    },
    {
      name: "Saved",
      link: "/bookmarks",
      icon: <Bookmark size={22} />,
    },
  ];

  const replaceLocation = () => {
    window.location.replace('/?page=1');
  }

  return (
    <header id='main-header' className='min-h-[10vh] py-6 l bg-white flex  shadow-sm'>
      <div id='main-header-container' className='w-full flex justify-between items-center'>
      <div className='logo-and-login'>
          <div className='logo'>
            <Link href="/?page=1" id='logo' onClick={() => replaceLocation()}>
              <Image
                priority
                src={'/pokemon--logo.png'}
                alt="logo"
                style={{width: '120px', height: '50px'}}
                width={120} height={50}
              />
            </Link>
          </div>
          {user?.sub && !isLoading && (
          <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger id='user-dropdown' className="outline-none border-none">
              <div className="bg-[#6c5ce7]/15 flex items-center justify-center gap-2 rounded-lg cursor-pointer">
                <span className="pl-2 text-[#6c5ce7] text-sm font-bold">
                  {user?.name || "User"}
                </span>
                <img
                  src={user?.picture || ""}
                  alt="avatar"
                  className="p-1 rounded-lg"
                  width={40}
                  height={40}
                />
              </div>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[160px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
         )}
          
          {!user?.sub && !isLoading && (
          <div id='login-button-container' className="flex items-center gap-4">
            <Button
              onClick={() => signIn('google')}
              className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
              bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out"
            >
              <LogIn size={20} />
              Login
            </Button>
          </div>
          )}
        </div>

          <div className='page-info-and-nav'>
            <div className="pageinfo">
            {pokemonListDetails && pokemonListDetails?.length > 0 ? 
            <>
            <p id="currentpageinfo">Текущая страница: {Number(page)}</p>
            </>
            : <p id="currentpageinfo">Текущая страница: {Number(page)}</p>
            }
            {!nodata ? 
            <>
            <p id="allpagesinfo">из {totalPage}</p>
            </>
            : <p id="allpagesinfo">из {totalPageDefault}</p>
            }
          </div>

            <nav>
              <ul id='menu' className='flex items-center gap-8 text-gray-400'>
                <li>
                  <button
                    // href={'/?page=1'}
                    // onClick={() => router.back()}
                    onClick={() => router.push(`/?page=${page}`)}
                    className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                      ${
                        pathname === '/'
                          ? "bg-[#6c5ce7]/15 text-[#6c5ce7]"
                          : ""
                      }
                  `}
                  >
                  <span><LayoutDashboard /></span>
                  </button>
                </li>
                <li>
                  <Link
                    href={'/favourites'}
                    className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                      ${
                        pathname === '/favourites'
                          ? "bg-[#6c5ce7]/15 text-[#6c5ce7]"
                          : ""
                      }
                  `}
                  >
                  <span><Heart size={22} /></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/bookmarks'}
                    className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                      ${
                        pathname === '/bookmarks'
                          ? "bg-[#6c5ce7]/15 text-[#6c5ce7]"
                          : ""
                      }
                  `}
                  >
                  <span><Bookmark /></span>
                  </Link>
                </li>
              </ul>
            </nav>
            {pathname === '/' && <SelectComponent />}
          </div>

      </div>
      {pathname === '/' && <div id='main-search-container'>
        <SearchComponent placeholder='Введите название...' />
      </div>}
    </header>
  )
}
