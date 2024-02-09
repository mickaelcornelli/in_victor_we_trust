"use client";

import { useEffect, useState } from "react";
import {
  getGameSummary,
  researchKeywordOnYoutube,
  getTeamLogo,
} from "../../../api/api";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";

const Match = ({ params }) => {
  const { slug } = params;
  const [matchDetails, setMatchDetails] = useState("");
  const [youtubeID, setYoutubeID] = useState("");

  const fetchData = async () => {
    try {
      const response = await getGameSummary(slug);
      
      if (response === undefined) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Match non trouvé</h1>
            <p className="text-gray-600 mb-8">
              Le match que vous cherchez n'existe pas.
            </p>
            <Link href="/#dailymatchs" className="btn bg-primary">
              Revenir au programme des matchs
            </Link>
          </div>
        );
      }

      if (
        response.status === "closed" ||
        response.status === "created" ||
        response.status === "scheduled"
      ) {
        const teamHomeLogo = await getTeamLogo(response.home.name);
        const teamAwayLogo = await getTeamLogo(response.away.name);

        response.home.logo = teamHomeLogo;
        response.away.logo = teamAwayLogo;

        response.home.players.sort(
          (a, b) => b.statistics.efficiency - a.statistics.efficiency
        );
        response.away.players.sort(
          (a, b) => b.statistics.efficiency - a.statistics.efficiency
        );

        const youtubeResponse = await researchKeywordOnYoutube(
          `${response.home.name} vs ${response.away.name}`
        );
        console.log(youtubeResponse)

        setYoutubeID(youtubeResponse);
      }

      setMatchDetails(response);
    } catch (error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Oups !</h1>
          <p className="text-gray-600 mb-8">
            Une erreur s'est produite, veuillez ré-essayer plus tard.
          </p>
          <Link href="/" className="btn bg-primary">
            Revenir à l'accueil
          </Link>
        </div>
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!matchDetails) {
    return (
      <div className="h-lvh flex items-center justify-center">
        <ThreeDots
          visible={true}
          height="60"
          width="60"
          color="rgb(52 211 153)"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Chargement du match...</div>}>
      {matchDetails && (
        <>
          {matchDetails.status === "scheduled" ||
            (matchDetails.status === "created" && (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Match à venir</h1>
                <p className="text-gray-600 mb-8">
                  Le résumé du match n'est pas encore disponible.
                </p>
                <Link href="/#dailymatchs" className="btn bg-primary">
                  Revenir aux matchs du jour
                </Link>
              </div>
            ))}

          {matchDetails.status === "closed" && (
            <section className="w-full mx-auto p-6 bg-zinc-900 shadow-md pt-8 min-h-lvh overflow-x-auto">
              <h2 className="text-center text-2xl font-bold mb-4 text-emerald-300 lg:text-left xl:text-left">
                Résultat du match
              </h2>

              {/* Résumé Global*/}
              <div key={matchDetails.id} className="mb-2 pb-4 relative">
                <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
                  <div className="mb-4 md:mb-0 md:mr-4">
                    <p className="text-lg font-bold text-white">
                      {matchDetails.home.name} vs {matchDetails.away.name}
                    </p>

                    <p className="text-white/60">
                      Date: {matchDetails.scheduled.slice(0, 10)}
                    </p>

                    <p className="text-white/60">
                      Durée: {matchDetails.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-white">
                      {matchDetails.venue.name}
                    </p>
                    <p className="text-white/60">
                      {matchDetails.venue.address}
                    </p>

                    <p className="text-white/60">{matchDetails.venue.city}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Domicile */}
                  <div className="rounded-md bg-gray-800 border p-4">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-emerald-300">
                          Équipe à domicile
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {matchDetails.home.name}
                        </p>
                        <p className="text-sm font-light text-white/60">
                          {matchDetails.home.market}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-extrabold text-white">
                          {matchDetails.home.points}
                        </p>
                        <Image
                          src={matchDetails.home.logo}
                          width={25}
                          height={25}
                          alt={`logo ${matchDetails.home.name}`}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* QT */}
                    <div className="flex gap-4 pt-4">
                      {matchDetails.home.scoring.map((score, index) => (
                        <div key={index}>
                          <h3 className="text-sm font-semibold text-white">
                            QT {score.number}
                          </h3>
                          <p className="text-sm font-light text-white/60">
                            {score.points}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extérieur */}
                  <div className="rounded-md bg-gray-800 border p-4">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-extrabold text-white">
                          {matchDetails.away.points}
                        </p>
                        <Image
                          src={matchDetails.away.logo}
                          width={25}
                          height={25}
                          alt={`logo ${matchDetails.away.name}`}
                          className="object-contain"
                        />
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-emerald-300">
                          Équipe à l'extérieur
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {matchDetails.away.name}
                        </p>
                        <p className="text-sm font-light text-white/60">
                          {matchDetails.away.market}
                        </p>
                      </div>
                    </div>

                    {/* QT */}
                    <div className="flex justify-end gap-4 pt-4">
                      {matchDetails.away.scoring.map((score, index) => (
                        <div key={index}>
                          <h3 className="text-sm font-semibold text-white">
                            QT {score.number}
                          </h3>
                          <p className="text-sm font-light text-white/60">
                            {score.points}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Composition des joueurs */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <table className="w-full rounded bg-gray-800">
                    <thead className="text-sm text-left bg-emerald-300 ">
                      <tr>
                        <th>Joueur</th>
                        <th>Pts</th>
                        <th>Reb</th>
                        <th>Pd</th>
                        <th>Min</th>
                        <th>2R-2T</th>
                        <th>3R-3T</th>
                        <th>TIRS%</th>
                        <th>LFR-LFT</th>
                        <th>LF%</th>
                        <th>Ro</th>
                        <th>Rd</th>
                        <th>Reb</th>
                        <th>Pd</th>
                        <th>Bp</th>
                        <th>In</th>
                        <th>Ct</th>
                        <th>Fa</th>
                        <th>+/-</th>
                        <th>Eva</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-white/80">
                      {matchDetails.home.players.map(
                        (player) =>
                          player.not_playing_reason === undefined &&
                          player.played && (
                            <tr
                              key={player.id}
                              className="border-t border-gray-700"
                            >
                              <td>{player.full_name}</td>
                              <td>{player.statistics.points}</td>
                              <td>{player.statistics.rebounds}</td>
                              <td>{player.statistics.assists}</td>
                              <td>{player.statistics.minutes}</td>
                              <td>{`${player.statistics.two_points_made}-${player.statistics.two_points_att}`}</td>
                              <td>{`${player.statistics.three_points_made}-${player.statistics.three_points_att}`}</td>
                              <td>{player.statistics.field_goals_pct}</td>
                              <td>{`${player.statistics.free_throws_made}-${player.statistics.free_throws_att}`}</td>
                              <td>{player.statistics.free_throws_pct}</td>
                              <td>{player.statistics.offensive_rebounds}</td>
                              <td>{player.statistics.defensive_rebounds}</td>
                              <td>{player.statistics.rebounds}</td>
                              <td>{player.statistics.assists}</td>
                              <td>{player.statistics.turnovers}</td>
                              <td>{player.statistics.steals}</td>
                              <td>{player.statistics.blocks}</td>
                              <td>{player.statistics.personal_fouls}</td>
                              <td>{`${player.statistics.plus}-${player.statistics.minus}`}</td>
                              <td>{player.statistics.efficiency}</td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>

                <div>
                  <table className="w-full rounded bg-gray-800">
                    <thead className="text-sm text-left bg-emerald-300 ">
                      <tr>
                        <th>Joueur</th>
                        <th>Pts</th>
                        <th>Reb</th>
                        <th>Pd</th>
                        <th>Min</th>
                        <th>2R-2T</th>
                        <th>3R-3T</th>
                        <th>TIRS%</th>
                        <th>LFR-LFT</th>
                        <th>LF%</th>
                        <th>Ro</th>
                        <th>Rd</th>
                        <th>Reb</th>
                        <th>Pd</th>
                        <th>Bp</th>
                        <th>In</th>
                        <th>Ct</th>
                        <th>Fa</th>
                        <th>+/-</th>
                        <th>Eva</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-white/80">
                      {matchDetails.away.players.map(
                        (player) =>
                          player.not_playing_reason === undefined &&
                          player.played && (
                            <tr
                              key={player.id}
                              className="border-t border-gray-700"
                            >
                              <td>{player.full_name}</td>
                              <td>{player.statistics.points}</td>
                              <td>{player.statistics.rebounds}</td>
                              <td>{player.statistics.assists}</td>
                              <td>{player.statistics.minutes}</td>
                              <td>{`${player.statistics.two_points_made}-${player.statistics.two_points_att}`}</td>
                              <td>{`${player.statistics.three_points_made}-${player.statistics.three_points_att}`}</td>
                              <td>{player.statistics.field_goals_pct}</td>
                              <td>{`${player.statistics.free_throws_made}-${player.statistics.free_throws_att}`}</td>
                              <td>{player.statistics.free_throws_pct}</td>
                              <td>{player.statistics.offensive_rebounds}</td>
                              <td>{player.statistics.defensive_rebounds}</td>
                              <td>{player.statistics.rebounds}</td>
                              <td>{player.statistics.assists}</td>
                              <td>{player.statistics.turnovers}</td>
                              <td>{player.statistics.steals}</td>
                              <td>{player.statistics.blocks}</td>
                              <td>{player.statistics.personal_fouls}</td>
                              <td>{`${player.statistics.plus}-${player.statistics.minus}`}</td>
                              <td>{player.statistics.efficiency}</td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Video Youtube */}
              {youtubeID && (
                <div className="mt-8">
                  <iframe
                    width="100%"
                    height="400"
                    className="lg:h-[600px] xl:h-[800px]"
                    src={`https://www.youtube.com/embed/${youtubeID}`}
                    title={`${matchDetails.home.name} vs ${matchDetails.away.name}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </Suspense>
  );
};

export default Match;
