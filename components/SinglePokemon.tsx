'use client';

import { PockemonSingleAllDetails, usePokemonDataProps } from "@/main";
import { typeColor } from "@/utils/colors";
import Image from "next/image";

interface Props {
  activePokemon: PockemonSingleAllDetails | null
}

const SinglePockemon: React.FC<Props> = ({activePokemon}) => {

  const typeNumber = Math.floor(Math.random() * 1);

  return (
    <main>
      <section id="pockemon-single-page-section" className="px-16 py-8 min-h-[90vh]  grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{
            background:
              typeColor[
                 activePokemon?.types[
                  typeNumber
                ].type.name!
              ],
          }}
      >

        <div className="flex flex-col justify-center gap-6">
          <div id="pockemon-single-page-name-container" className="flex flex-col gap-1">
            <div className="flex gap-4">
              <h1 id="pockemon-single-page-name" className="text-6xl font-bold capitalize text-white drop-shadow-sm">
                {activePokemon?.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-2xl font-bold">Abilities</h2>
            <ul id="pockemon-single-page-abilities-ul" className="flex gap-2">
              {activePokemon && activePokemon?.abilities.map(
                (ability: any, index: number) => (
                  <li
                    key={index}
                    className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white/80 rounded-full"
                    style={{
                      color:
                        typeColor[
                           activePokemon?.types[
                            typeNumber
                          ].type.name!
                        ],
                    }}
                  >
                    {ability.ability.name}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex text-white flex-col gap-2">
            <h2 className="text-2xl font-bold">Types</h2>
            <ul className="flex flex-wrap gap-2">
              {activePokemon && activePokemon?.types.map((type: any, index: number) => (
                <li
                  key={index}
                  className="px-4 py-2 flex items-center gap-2 text-sm font-bold rounded-full bg-white/80"
                    style={{
                      color:
                        typeColor[
                           activePokemon?.types[
                            typeNumber
                          ].type.name!
                        ],
                    }}
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="pockemon-single-page-empty-div"></div>
        <div id="pockemon-single-page-images-container" className="relative flex justify-center items-center">
          {activePokemon && <Image
            loading='lazy'
            src={`/icons/${activePokemon?.types[0].type.name}.svg`}
            alt="pockemon type"
            width={300}
            height={300}
            className="absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />}

          {activePokemon &&<Image
            priority
            src={
              activePokemon?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt="pockemon image"
            width={300}
            height={300}
            className="relative z-10 filter drop-shadow-lg"
          />}
        </div>

        <div className="text-white flex flex-col gap-2">
        <h2 className=" text-2xl font-bold">Base Stats</h2>
        <ul className="flex flex-col gap-4">
          {activePokemon && activePokemon?.stats.map((stat: any, index: number) => (
            <li key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span className="capitalize">{stat.stat.name}</span>
                <span className="font-bold">{stat.base_stat}</span>
              </div>
              <div className="w-full h-3 bg-white/15 rounded-md overflow-hidden mt-1">
                <div
                  className={`h-full rounded-md bg-white`}
                  style={{
                    width: `${(stat.base_stat / 200) * 100}%`,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </section>
    </main>
  )
}

export default SinglePockemon;
