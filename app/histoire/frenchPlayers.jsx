'use client'

import Link from 'next/link'
import { extractPlayerIdFromImageUrl } from "../../lib/utils";
import Image from 'next/image';

const FrenchiesPlayers = ({players}) => {
  return (
    <div className="w-full mx-auto p-6 bg-gray-900 shadow-md pt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Les Français en NBA
        </h2>
        {players.map((player, index) => (
          <Link
            key={index}
            href={`/joueurs/${extractPlayerIdFromImageUrl(player.img)}`}
            className="hover:opacity-50 transition-opacity"
          >
            <div className="mb-6 border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Image
                    src={player.img}
                    alt={player.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-emerald-400">
                      {player.name}
                    </h3>
                    <p className="text-light  text-gray-600">
                      Joueur français en NBA
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-white">{player.biography}</p>
                </div>
                <div>
                  <p className="text-white">{player.impact}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
  )
}

export default FrenchiesPlayers