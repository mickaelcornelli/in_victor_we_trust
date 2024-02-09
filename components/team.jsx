"use client";

import { useEffect, useState } from "react";
import { getTeamDetails } from "../api/api";
import { NBAList } from "../constants";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";

const getTeamData = async (slug) => {
  return NBAList.teams.find((team) => team.tid == slug);
};

const Team = ({ slug }) => {
  const [team, setTeam] = useState();
  const [teamDetails, setTeamDetails] = useState("");

  const fetchData = async () => {
    const response = await getTeamData(slug);
    if (response === undefined) {
      return (
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
      );
    }

    setTeam(response);
    if (response.uid !== undefined) {
      const teamDetailsResponse = await getTeamDetails(response.uid);
      if (teamDetailsResponse !== undefined) {
        setTeamDetails(teamDetailsResponse);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Équipe non trouvée</h1>
        <p className="text-gray-600 mb-8">
          L'équipe que vous cherchez n'existe pas.
        </p>
        <Link href="/equipes" className="btn bg-primary">
          Revenir à la liste des équipes
        </Link>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
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
      }
    >
      {team && (
        <div className="bg-[#1d1d1b] p-8">
          <div className="flex flex-col md:flex-row md:justify-between pt-4 gap-4">
            {/* Le club */}
            <div className="w-full md:max-w-[540px]  p-6 rounded bg-white  shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{team.name}</h1>
                <Image
                  src={team.imgURL}
                  alt={team.name}
                  width={80}
                  height={80}
                  className="mt-4 rounded-md shadow-md"
                />
              </div>

              <p>
                <span className="font-semibold">Alias:</span> {team.abbrev}
              </p>
              <p>
                <span className="font-semibold">Région:</span> {team.region}
              </p>
              <p>
                <span className="font-semibold">Population:</span> {team.pop}
              </p>
              <p>
                <span className="font-semibold">Capacité du stade:</span>{" "}
                {team.stadiumCapacity}
              </p>
              {team.retiredJerseyNumbers !== undefined && (
                <p>
                  <span className="font-semibold">Maillots retirés:</span>{" "}
                  {team.retiredJerseyNumbers
                    ?.map((jersey) => jersey.number)
                    .join(", ")}
                </p>
              )}
              <div></div>
            </div>

            {/* Maillot */}
            {teamDetails !== "" && (
              <div className="w-full flex justify-between md:max-w-[540px] p-6 rounded bg-white shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
                <div>
                  <h1 className="text-2xl font-bold mb-4">Maillot</h1>
                  <div className="flex justify-start items-center space-x-2">
                    {teamDetails &&
                      teamDetails.team_colors &&
                      teamDetails.team_colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex_color }}
                        ></div>
                      ))}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-4">Stade</h1>
                  <p>
                    <span className="font-semibold">Nom:</span>{" "}
                    {teamDetails.venue.name}
                  </p>
                  <p>
                    <span className="font-semibold">Capacité:</span>{" "}
                    {teamDetails.venue.capacity}
                  </p>
                  <p>
                    <span className="font-semibold">Adresse:</span>{" "}
                    {teamDetails.venue.address} - {teamDetails.venue.city}
                  </p>
                </div>
              </div>
            )}

            {/* Dernière saison*/}
            <div className="w-full md:max-w-[540px] rounded p-6 bg-white  shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
              <h1 className="text-2xl font-bold mb-4">Précédante saison</h1>
              <div>
                <p>
                  Saison :{" "}
                  {team.seasons.slice(team.seasons.length - 2)[0].season}
                </p>
                <p>
                  Ratio W/L :{" "}
                  {team.seasons.slice(team.seasons.length - 2)[0].won}/
                  {team.seasons.slice(team.seasons.length - 2)[0].lost}
                </p>
                <p>
                  {team.seasons.slice(team.seasons.length - 2)[0]
                    .playoffRoundsWon === -1
                    ? "Ne s'est pas qualifié au playoff"
                    : `Qualification en playoff. Matchs gagnés durant les playoff : ${
                        team.seasons.slice(team.seasons.length - 2)[0]
                          .playoffRoundsWon
                      }`}
                </p>
              </div>
            </div>
          </div>

          {/* Composition de l'équipe */}
          {teamDetails !== "" && (
            <div className="w-full mx-auto p-6 bg-white rounded-md shadow-md mt-8">
              <h1 className="text-2xl font-bold mb-4">
                Composition de l'équipe
              </h1>
              {/* Entraîneur */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Entraîneur:</h2>
                <p className="text-emerald-800 font-semibold">
                  {teamDetails.coaches[0]?.full_name}
                </p>
              </div>
              {/* Joueurs */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Joueurs:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {teamDetails.players
                    .slice()
                    .sort((a, b) => b.experience - a.experience)
                    .map((player) => (
                      <div
                        key={player.id}
                        className="bg-gray-100 p-4 rounded-md shadow-md"
                      >
                        <h3 className="text-lg font-semibold">
                          {player.full_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {player.position} - {player.primary_position}
                        </p>
                        <p className="text-sm text-gray-600">
                          Maillot
                          <span className="text-emerald-400 font-bold">
                            {" " + player.jersey_number}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Historique */}
          <div className="w-full mx-auto p-6 bg-white rounded-md shadow-md mt-8">
            <h1 className="text-2xl font-bold mb-4">
              Historique des saisons du club
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.seasons.map((season, index) => {
                return (
                  team.seasons.length - 1 !== index && (
                    <div
                      key={season.season}
                      className="bg-gray-100 p-4 rounded-md shadow-md mb-4"
                    >
                      <p className="text-lg font-semibold mb-2">
                        Saison {season.season}
                      </p>
                      {season.imgUrl !== undefined && (
                        <Image
                          src={season.imgURL}
                          alt={`Team logo for season ${season.season}`}
                          className="w-12 h-12 mr-2"
                          width={40}
                          height={40}
                        />
                      )}
                      <div className="flex items-center mb-4">
                        <p className="font-semibold">
                          Ratio W/L : {season.won}/{season.lost}
                        </p>
                      </div>
                      <p>
                        {season.playoffRoundsWon === -1
                          ? "Ne s'est pas qualifié au playoff"
                          : `Qualification en playoff. Matchs gagnés durant les playoff : ${season.playoffRoundsWon}`}
                      </p>
                      {season.colors !== undefined && (
                        <p className="pt-2">
                          <span className="font-semibold">Couleurs :</span>{" "}
                          {season?.colors?.map((color, index) => (
                            <span
                              key={index}
                              className="inline-block w-4 h-4 bg-gray-300 mr-2"
                              style={{ backgroundColor: color }}
                            ></span>
                          ))}
                        </p>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Team;
