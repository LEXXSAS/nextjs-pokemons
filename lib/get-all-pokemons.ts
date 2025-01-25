import PokemonsService from "@/constans/get-service";
export const fetchAllPokemons = async() => {
  try {
    const res = await PokemonsService.fetchAllPokemons();
    if (!res) return;
    console.log(
      "🚀", res.results.length)
    return res.results;
  } catch (e) {
    console.log(e)
  }
}
// export const fetchAllPokemons = async() => {
//   try {
//     const promiseres = await new Promise(
//       (resolve) => setTimeout(resolve, 2000))
//       .then(async() => {
//         const res = await PokemonsService.fetchAllPokemons();
//         if (!res) return;
//         console.log(
//           "🚀", res.results.length)
//         return res.results;
//     })
//     return promiseres;
//   } catch (e) {
//     console.log(e)
//   }
// }
