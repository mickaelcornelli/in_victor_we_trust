"use client";

import { useEffect, useState, Suspense } from "react";
import {
  getSpecificPlayer,
  researchKeywordOnYoutube,
  getTeamName,
} from "../../../api/api";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import Link from "next/link";

const Player = ({ slug }) => {
  const [player, setPlayer] = useState();
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getSpecificPlayer(slug);
      if (response !== undefined) {
        setPlayer(response);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  // Récupération d'une ID de vidéo youtube via l'API
  const fetchYoutubeVideoId = async () => {
    try {
      const response = await researchKeywordOnYoutube(`${player.name} highlights`);
      setYoutubeVideoId(response);
    } catch (error) {
      console.error("Error fetching YouTube video ID:", error);
    }
  };

  // Convertir taille en CM
  const inchesToCm = (inches) => {
    const cmConversionFactor = 2.54;
    return inches * cmConversionFactor;
  };

  //Convertir poid en KG
  const lbsToKg = (lbs) => {
    const kgConversionFactor = 0.453592;
    return lbs * kgConversionFactor;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (player) {
      fetchYoutubeVideoId();
    }
  }, [player]);

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Joueur non trouvée</h1>
        <p className="text-gray-600 mb-8">
          Le joueur que vous cherchez n'existe pas.
        </p>
        <Link href="/joueurs" className="btn bg-primary">
          Revenir à la liste des joueurs
        </Link>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-lvh">
          <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="rgb(52 211 153)"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      }
    >
      <div className="bg-gray-950 pt-8 pb-8">
        <div className="container mx-auto shadow-sm p-8 shadow-white rounded-lg  text-white">
          {player && (
            <>
              <div className="flex justify-center mx-auto mb-8 md:mx-0 md:justify-start">
                <Image
                  src={player.imgURL}
                  alt={player.name}
                  width={250}
                  height={250}
                />
              </div>

              <h1 className="text-3xl text-center font-bold text-emerald-400 mb-4 md:text-left">
                {player.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                <div>
                  <strong className="block">Poste:</strong>
                  <p>{player.pos}</p>
                </div>

                <div>
                  <strong className="block">Taille:</strong>
                  <p>{inchesToCm(player.hgt).toFixed(2)} cm</p>
                </div>

                <div>
                  <strong className="block">Poids:</strong>
                  <p>{lbsToKg(player.weight).toFixed(2)} kg</p>
                </div>

                {player.jerseyNumber !== undefined &&
                  player.jerseyNumber !== "" && (
                    <div>
                      <strong className="block">N° de maillot:</strong>
                      <p>{player.jerseyNumber}</p>
                    </div>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <strong>Année de naissance:</strong>
                  <p>{player.born.year}</p>
                </div>
                <div>
                  <strong>Lieu de naissance:</strong>
                  <p>{player.born.loc}</p>
                </div>
                {player.contract !== undefined && (
                  <div>
                    <strong>Expiration du contrat:</strong>
                    <p>{player.contract.exp}</p>
                  </div>
                )}
                {player.draft.originalTid !== undefined &&
                  player.draft.originalTid !== "" && (
                    <div>
                      <strong>Équipe d'origine au repêchage:</strong>
                      <p>{getTeamName(player.draft.originalTid)}</p>
                    </div>
                  )}
                <div>
                  <strong>Collège:</strong>
                  <p>{player.college}</p>
                </div>
                {player.injury !== undefined && (
                  <div>
                    <strong>État de blessure:</strong>
                    <p>
                      {player.injury.type === "Healthy"
                        ? "En bonne santé"
                        : "Blessé"}
                    </p>
                  </div>
                )}
              </div>

              {player.ratings && player.ratings.length > 0 && (
                <div className="mt-4 mb-4">
                  <strong className="block text-lg mb-2">Évaluations:</strong>
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-zinc-700 border border-gray-300 rounded-lg text-center">
                      <thead>
                        <tr className="bg-gray-900 text-emerald-700">
                          <th className="py-2 px-4 border">Saison</th>
                          <th className="py-2 px-4 border">Hauteur</th>
                          <th className="py-2 px-4 border">Force</th>
                          <th className="py-2 px-4 border">Vitesse</th>
                          <th className="py-2 px-4 border">Saut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {player.ratings.map((rating,index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 hover:text-black hover:font-semibold"
                          >
                            <td className="py-2 px-4 border">
                              {rating.season}
                            </td>
                            <td className="py-2 px-4 border">{rating.hgt}</td>
                            <td className="py-2 px-4 border">{rating.stre}</td>
                            <td className="py-2 px-4 border">{rating.spd}</td>
                            <td className="py-2 px-4 border">{rating.jmp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {player.relatives && player.relatives.length > 0 && (
                <div>
                  <strong>Relations:</strong>
                  <ul>
                    {player.relatives.map((relative,index) => (
                      <li key={index}>
                        {relative.name} ({relative.type})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {player.awards && player.awards.length > 0 && (
                <div>
                  <strong>Distinctions:</strong>
                  <ul>
                    {player.awards.map((award,index) => (
                      <li key={index}>
                        {award.season}: {award.type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Statistiques du joueur */}
              {player.stats && player.stats.length > 0 && (
                <div className="mt-4">
                  <strong className="block text-lg mb-2">Statistiques:</strong>
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-zinc-700 border border-gray-300 rounded-lg">
                      <thead>
                        <tr className="bg-gray-900 text-emerald-700">
                          <th className="py-2 px-4 border">Année</th>
                          <th className="py-2 px-4 border">Points par match</th>
                          <th className="py-2 px-4 border">
                            Rebonds par match
                          </th>
                          <th className="py-2 px-4 border">
                            Assists par match
                          </th>
                          <th className="py-2 px-4 border">Steals par match</th>
                        </tr>
                      </thead>
                      <tbody>
                        {player.stats.map((stat,index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 hover:text-black hover:font-semibold text-center"
                          >
                            <td className="py-2 px-4 border">{stat.season}</td>
                            <td className="py-2 px-4 border">{stat.pts}</td>
                            <td className="py-2 px-4 border">
                              {stat.reb === undefined ? "/" : stat.reb}
                            </td>
                            <td className="py-2 px-4 border">{stat.ast}</td>
                            <td className="py-2 px-4 border">{stat.stl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Video Youtube */}
              {youtubeVideoId && (
                <div className="mt-8">
                  <iframe
                    width="100%"
                    height="400"
                    className="lg:h-[600px] xl:h-[800px]"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={`${player.name} Highlights`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Player;
