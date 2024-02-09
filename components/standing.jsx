"use client";

import { getNbaStandings } from "../api/api";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ComboBoxSeasons from "./ComboBoxSeasons";
import { getTeamLogo } from "../api/api";
import Image from "next/image";

const Standing = () => {
  const [standings, setStandings] = useState();
  const [activeConference, setActiveConference] = useState("east");

  // Récupérer le classement NBA
  const fetchStandings = async (season) => {
    const response = await getNbaStandings(season);

    const westTeams = response.conferences[0].divisions.flatMap(
      (division) => division.teams
    );
    const eastTeams = response.conferences[1].divisions.flatMap(
      (division) => division.teams
    );

    // Récupérer les logos de toutes les équipes
    const westTeamsWithLogos = await Promise.all(
      westTeams.map(async (team) => {
        const logoUrl = await getTeamLogo(team.name);
        return { ...team, logoUrl };
      })
    );
    const eastTeamsWithLogos = await Promise.all(
      eastTeams.map(async (team) => {
        const logoUrl = await getTeamLogo(team.name);
        return { ...team, logoUrl };
      })
    );

    // Trier les équipes par le nombre de victoires
    westTeamsWithLogos.sort(compareWins);
    eastTeamsWithLogos.sort(compareWins);

    // Mettre à jour l'état avec les équipes triées
    setStandings({ westTeamsWithLogos, eastTeamsWithLogos });
  };

  // Fonction pour gérer le changement de saison sélectionnée
  const handleSeasonChange = (season) => {
    // Appeler la fonction fetchData avec la saison sélectionnée
    fetchStandings(season);
  };

  // Fonction pour rendre les titres cliquables et basculer entre les conférences
  const renderConferenceTitle = (conference, title) => (
    <h2
      key={conference}
      className={`flex cursor-pointer ${
        activeConference === conference
          ? "border-b-2 border-[#dadce0] font-bold text-white"
          : "border-b-[1px] border-[#3c4043]"
      }`}
      onClick={() => toggleConference(conference)}
    >
      {title}
    </h2>
  );

  // Fonction pour rendre la table des équipes
  const renderTeamsTable = () => (
    <table className="min-w-full bg-slate-800 text-left text-zinc-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Equipe</th>
          <th className="py-2 px-4 border-b">Pos.</th>
          <th className="py-2 px-4 border-b">V</th>
          <th className="py-2 px-4 border-b">D</th>
          <th className="py-2 px-4 border-b">%</th>
          <th className="py-2 px-4 border-b">Dom.</th>
          <th className="py-2 px-4 border-b">Ext.</th>
          <th className="py-2 px-4 border-b">Div.</th>
          <th className="py-2 px-4 border-b">Conf.</th>
          <th className="py-2 px-4 border-b">Diff.</th>
          <th className="py-2 px-4 border-b">D10</th>
          <th className="py-2 px-4 border-b">Sér.</th>
        </tr>
      </thead>
      <tbody>
        {activeConference === "east"
          ? standings.eastTeamsWithLogos.map((team, teamIndex) =>
              renderTeamRow(team, teamIndex)
            )
          : standings.westTeamsWithLogos.map((team, teamIndex) =>
              renderTeamRow(team, teamIndex)
            )}
      </tbody>
    </table>
  );

  // Fonction pour rendre une ligne d'équipe
  const renderTeamRow = (team, teamIndex) => (
    <tr key={teamIndex} className="border-t-[0.5px] border-gray-600">
      <td className="py-2 px-4 flex gap-4">
        <Image src={team.logoUrl} width={25} height={25} alt="logo" className="object-contain"/>
        {team.name}
      </td>
      <td className="py-2 px-4">{teamIndex + 1}</td>
      <td className="py-2 px-4">{team.wins}</td>
      <td className="py-2 px-4">{team.losses}</td>
      <td className="py-2 px-4">{(team.win_pct * 100).toFixed(0)}</td>
      <td className="py-2 px-4">
        {formatRecord(
          team.records.find((record) => record.record_type === "home").wins,
          team.records.find((record) => record.record_type === "home").losses
        )}
      </td>
      <td className="py-2 px-4">
        {formatRecord(
          team.records.find((record) => record.record_type === "road").wins,
          team.records.find((record) => record.record_type === "road").losses
        )}
      </td>
      <td className="py-2 px-4">
        {formatRecord(
          team.records.find((record) => record.record_type === "division").wins,
          team.records.find((record) => record.record_type === "division")
            .losses
        )}
      </td>
      <td className="py-2 px-4">
        {formatRecord(
          team.records.find((record) => record.record_type === "conference")
            .wins,
          team.records.find((record) => record.record_type === "conference")
            .losses
        )}
      </td>
      <td className="py-2 px-4">{team.point_diff}</td>
      <td className="py-2 px-4">
        {formatRecord(
          team.records.find((record) => record.record_type === "last_10").wins,
          team.records.find((record) => record.record_type === "last_10").losses
        )}
      </td>
      <td className="py-2 px-4">
        {team.streak.kind === "win"
          ? "W" + team.streak.length
          : "D" + team.streak.length}
      </td>
    </tr>
  );

  // Fonction pour formater le record (e.g., 8-2)
  const formatRecord = (wins, losses) => `${wins}-${losses}`;

  // Fonction de classement pour trier les équipes par nombre de victoires
  const compareWins = (teamA, teamB) => teamB.wins - teamA.wins;

  // Fonction pour basculer entre les conférences
  const toggleConference = (conference) => {
    setActiveConference(conference);
  };

  useEffect(() => {
    //Récupère le classement de la saison 2023-2024
    fetchStandings(2023);
  }, []);

  if (!standings) {
    return (
      <div className="h-lvh flex items-center justify-center bg-gray-950">
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
    <div className="bg-zinc-900">
      <div className="container mx-auto p-8 overflow-x-auto">
        <div className="flex justify-around">
          <div className="w-full">
            <ComboBoxSeasons handleSeasonChange={handleSeasonChange} />
            <div className="flex justify-between p-4 bg-slate-800  text-[#bdc1c6] z-10">
              <div className="w-[50%]">
                {renderConferenceTitle("east", "Conférence Est de la NBA")}
              </div>
              <div className="w-[50%]">
                {renderConferenceTitle("west", "Conférence Ouest de la NBA")}
              </div>
            </div>
            {renderTeamsTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standing;
