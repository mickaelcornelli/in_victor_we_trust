"use client";
import {
  rulesAndEquipment,
  decades,
  iconicTeamsData,
  basketballLegends,
  iconicRivalries,
  historicMoments,
  frenchPlayers,
} from "../constants/index";
import IntroNBA from "./intro";
import TemporalEvolution from "./temporalEvolution";
import IconicTeams from "./iconicTeams";
import LegendsPlayers from "./legendsPlayers";
import Rivalries from "./rivalries";
import HistoricMoments from "./historicMoments";
import Strategies from "./strategies";
import FrenchiesPlayers from "./frenchPlayers";
import MajorEvents from "./majorEvents";

const History = () => {
  return (
    <>
      {/* Intro NBA */}
      <IntroNBA />

      {/* Évolution Temporelle */}
      <TemporalEvolution
        rulesAndEquipment={rulesAndEquipment}
        decades={decades}
      />

      {/* Équipes iconiques */}
      <IconicTeams teams={iconicTeamsData} />

      {/* Légendes / Rivalités / Moment cultes */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto">
          <LegendsPlayers players={basketballLegends} />
          <Rivalries teams={iconicRivalries} />
          <HistoricMoments moments={historicMoments} />
        </div>
      </section>

      {/*Nos frenchies */}
      <FrenchiesPlayers players={frenchPlayers} />

      {/* Stratégies et vidéo */}
      <Strategies />

      {/* Evenements majeurs */}
      <MajorEvents />
    </>
  );
};

export default History;
