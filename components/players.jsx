"use client";

import Image from "next/image";
import { NBAList } from "../constants";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { extractPlayerIdFromImageUrl } from "../lib/utils";
import useDeviceSize from "../lib/useDeviceSize";
import { ThreeDots } from "react-loader-spinner";

const Players = () => {
  // Déterminer si l'application est vu sur mobile ou pc
  const [width] = useDeviceSize();

  // État pour stocker les données des joueurs
  const [players, setPlayers] = useState([]);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -632, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 632, behavior: "smooth" });
  };

  const scrollUp = () => {
    scrollContainerRef.current.scrollBy({ top: -400, behavior: "smooth" });
  };

  const scrollDown = () => {
    scrollContainerRef.current.scrollBy({ top: 400, behavior: "smooth" });
  };

  const getTeamName = (teamId) => {
    const team = NBAList.teams.find((t) => t.tid === teamId);

    return (
      team && (
        <div className="flex items-center justify-between">
          <p>Equipe : {team.name}</p>
          <Image
            src={team.imgURL}
            width={25}
            height={25}
            alt={`Logo ${team.name}`}
            className="object-contain ml-2"
          />
        </div>
      )
    );
  };

  useEffect(() => {
    // Récupérer la liste de joueurs depuis le fichier JSON
    setPlayers(NBAList.players);
  }, []);

  if (players.length === 0) {
    return (
      <div className="h-lvh flex items-center justify-center">
        <ThreeDots
          visible={true}
          height="60"
          width="60"
          color="rgb(52 211 153)"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <>
      {players.length > 0 && (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto h-[90vh]"
          >
            {players.map((player, index) => (
              <div
                key={index}
                className="flex flex-col items-start md:mr-4 min-w-[300px] shadow-md rounded p-4 mb-10 relative"
              >
                <img
                  src={player.imgURL}
                  alt={`${player?.name}`}
                  className="w-auto h-auto rounded mb-4"
                />
                <h2 className="font-black">
                  {player.name !== undefined
                    ? player.name
                    : player.firstName + player.lastName}
                </h2>
                {getTeamName(player.tid)}
                <p>{`Position: ${player.pos}`}</p>
                <p>{`Né en ${player.born.year} à ${player.born.loc}`}</p>
                <p>{`Collège: ${player.college}`}</p>
                {player.contract !== undefined && (
                  <p>{`Contrat jusqu'à la saison ${player.contract.exp}`}</p>
                )}
                <p>{`Draft: Round ${player.draft.round}, Pick ${player.draft.pick}, Team ${player.draft.tid}, Year ${player.draft.year}`}</p>
                {player.awards !== undefined && (
                  <p>{`Récompenses: ${player.awards.length}`}</p>
                )}

                <div className="flex items-center justify-center">
                  <Link
                    href={`/joueurs/${extractPlayerIdFromImageUrl(
                      player.imgURL
                    )}`}
                    className="absolute bottom-4 right-2 md:right-0 md:left-0 flex md:w-[50%] mx-auto items-center justify-center bg-emerald-800 text-white font-bold py-2 px-4 mt-5 rounded transition duration-300 hover:bg-emerald-500"
                  >
                    <button>Voir en détail</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {width >= 768 ? (
            <>
              <button
                onClick={scrollLeft}
                className="absolute top-2/3 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              >
                <HiOutlineArrowNarrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={scrollRight}
                className="absolute top-2/3 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              >
                <HiOutlineArrowNarrowRight className="w-6 h-6" />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center self-center">
              <button
                onClick={scrollUp}
                className="absolute top-[25px] transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              >
                <HiOutlineArrowNarrowUp className="w-6 h-6" />
              </button>

              <button
                onClick={scrollDown}
                className="absolute bottom-[25px] transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              >
                <HiOutlineArrowNarrowDown className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Players;
