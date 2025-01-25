import { PockemonResults, PockemonSingleAllDetails } from '@/main';
import { create } from 'zustand';

export interface IUserDetails {
  id?:          string,
  userEmail?:   string,
  bookmarks?:   String[],
  liked:       String[],
  createdAt?:   Date,
  updatedAt?:   Date
}

interface States {
  count: number;
  loading: boolean;
  selectedactive: boolean;
  page: number;
  searchquery: string;
  keytrigger: boolean;
  keydata: string;
  loadingtime: number;
  loadingtimepagination: number;
  totalPage: number;
  totalPageDefault: number;
  pageQty: number;
  typeValue: IValue;
  typeValueDefault: IValue;
  types: PockemonSingleAllDetails[] | [];
  originaltypes: string [][];
  filteredsearch: PockemonResults[] | null;
  useremail: string;
  userDetails: IUserDetails | null;
  newpokemon: {name: string}[];
  newpokemonforbookmark: {name: string}[];
  likedpokemons: {name: string}[];
  bookmarkedpokemons: {name: string}[];
  searchtrigger: boolean
}

interface NoDataStates {
  nodata: boolean;
  nodatatwo: boolean;
  nodatathree: boolean;
}

interface Details {
  pokemonList: PockemonResults[] | null;
  pokemonListDetails: PockemonSingleAllDetails[] | null;
}

interface IValue {
  value: string;
  label: string;
}

interface Actions {
  setIncrementCount: () => Promise<void>;
  setKeyData: (keydata: string) => void;
  setKeytrigger: (load: boolean) => void;
  setLoad: (load: boolean) => void;
  setPokemonList: (pokemonList: PockemonResults[] | null) => void;
  setPokemonListDetails: (pokemonListDetails: PockemonSingleAllDetails[] | null) => void;
  setPage: (page: number) => void;
  setSearchValue: (searchquery: string) => void;
  setNodata: (nodata: boolean) => void;
  setNodataTwo: (nodatatwo: boolean) => void;
  setNodataThree: (nodatathree: boolean) => void;
  setTotalPage: (totalPage: number) => void;
  setTypeValue: (value: IValue) => void;
  setTypes: (types: PockemonSingleAllDetails[]) => void;
  setOriginalTypes: (originaltypes: string [][]) => void;
  setSelectedActive: (selectedactive: boolean) => void;
  setFilteredSearch: (filteredsearch: PockemonResults[] | null) => void;
  setUserEmail: (useremail: string) => void;
  setUserDetails: (userDetails: IUserDetails) => void;
  setNewPokemonLike: (newpokemon: {name: string}[]) => void;
  setNewPokemonForBookmark: (newpokemonforbookmark: {name: string}[]) => void;
  setLikedPokemons: (likedpokemons: {name: string}[]) => void;
  setBookmarkedPokemons: (bookmarkedpokemons: {name: string}[]) => void;
  setSearchTrigger: (searchtrigger: boolean) => void
}
export const useStore = create<States & Actions & Details & NoDataStates>((set, get) => ({
  count: 0,
  loading: false,
  pokemonList: [],
  page: 1,
  pokemonListDetails: [],
  searchquery: '',
  keytrigger: false,
  keydata: '',
  nodata: false,
  nodatatwo: false,
  nodatathree: false,
  loadingtime: 250,
  loadingtimepagination: 150,
  totalPage: 0,
  totalPageDefault: 0,
  pageQty: 4,
  typeValue: {value: 'Выбор типа', label: 'Выбор типа'},
  typeValueDefault: {value: 'Выбор типа', label: 'Выбор типа'},
  types: [],
  originaltypes: [],
  selectedactive: false,
  filteredsearch: [],
  useremail: '',
  userDetails: null,
  newpokemon: [{name: ''}],
  newpokemonforbookmark: [{name: ''}],
  likedpokemons: [],
  bookmarkedpokemons: [],
  searchtrigger: false,
  setIncrementCount: async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    set((state) => ({ count: state.count + 1 }));
  },
  setKeytrigger: (keytrigger: boolean) => set({ keytrigger }),
  setLoad: (loading: boolean) => set({ loading }),
  setPokemonList: (pokemonList: PockemonResults[] | null) => set({ pokemonList }),
  setPokemonListDetails: (pokemonListDetails: PockemonSingleAllDetails[] | null) => set({ pokemonListDetails }),
  setPage: (page: number) => set({ page }),
  setSearchValue: (searchquery: string) => set({ searchquery }),
  setKeyData: (keydata: string) => set({ keydata }),
  setNodata: (nodata: boolean) => set({ nodata }),
  setNodataTwo: (nodatatwo: boolean) => set({ nodatatwo }),
  setNodataThree: (nodatathree: boolean) => set({ nodatathree }),
  setTotalPage: (totalPage: number) => set({ totalPage }),
  setTypeValue: (value: IValue) => set({ typeValue: value }),
  setTypes: (types: PockemonSingleAllDetails[]) => set({ types }),
  setOriginalTypes: (originaltypes: string [][]) => set({ originaltypes }),
  setSelectedActive: (selectedactive: boolean) => set({ selectedactive }),
  setFilteredSearch: (filteredsearch: PockemonResults[] | null) => set({ filteredsearch }),
  setUserEmail: (useremail: string) => set({ useremail }),
  setUserDetails: (userDetails: IUserDetails) => set({ userDetails }),
  setNewPokemonLike: (newpokemon: {name: string}[]) => set({ newpokemon }),
  setNewPokemonForBookmark: (newpokemonforbookmark: {name: string}[]) => set({ newpokemonforbookmark }),
  setLikedPokemons: (likedpokemons: {name: string}[]) => set({ likedpokemons }),
  setBookmarkedPokemons: (bookmarkedpokemons: {name: string}[]) => set({ bookmarkedpokemons }),
  setSearchTrigger: (searchtrigger: boolean) => set({ searchtrigger })
}))
