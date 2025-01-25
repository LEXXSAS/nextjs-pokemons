import PokemonsService from "@/constans/get-service";

// export const fetchPokemons = async(page: number) => {
//   try {
//     const res = await PokemonsService.fetchPokemons(page);
//     if (!res) return;
//     return res;
//   } catch (e) {
//     console.log(e)
//   }
// }

export const fetchPokemons = async(page: number) => {
  try {
    const promiseres = await new Promise(
      (resolve) => setTimeout(resolve, 0))
      .then(async() => {
        const res = await PokemonsService.fetchPokemons(page);
        if (!res) return;
        return res;
    })
    return promiseres;
  } catch (e) {
    console.log(e)
  }
}
