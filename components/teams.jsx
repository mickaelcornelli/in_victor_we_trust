"use client";

import Link from "next/link";
import { NBAList } from "../constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      let teamsArr = [];
      NBAList.teams.forEach((team) => {
        teamsArr.push(team);
      });

      setTeams(teamsArr);
    };

    fetchTeams();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-4">Les équipes de la NBA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 min-h-lvh">
        {teams.length === 0 && (
          <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="rgb(52 211 153)"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        )}
        {teams.map((team, index) => {
          return (
            <Link key={index} href={`/equipes/${team.tid}`}>
              <div
                key={team.tid}
                className="bg-white rounded-lg shadow-md mt-4 mb-4 relative p-8 flex flex-col justify-center cursor-pointer hover:scale-105 transition-all min-h-60"
              >
                <div className="absolute top-2 left-2">
                  <h2 className="text-slate-500 text-xs">{team.abbrev}</h2>
                </div>
                <Image
                  src={team.imgURL}
                  alt={team.name}
                  className="mx-auto mb-4"
                  width={100}
                  height={100}
                />
                <div className="absolute bottom-2 right-0 left-0">
                  <p className="text-center font-semibold uppercase">
                    {team.name}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
