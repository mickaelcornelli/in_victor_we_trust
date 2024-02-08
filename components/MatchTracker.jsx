import { getMatchsOfTheDay, getMatchResults } from "../api/api";
import MatchCalendar from "./MatchCalendar";

const MatchTracker = async () => {
  try {
    /* Appel de la première API */
    const dailyMatchs = await getMatchsOfTheDay();

    /* Attendez 2 secondes */
    await new Promise((resolve) => setTimeout(resolve, 2000));

    /* Appel de la deuxième API après 2 secondes en raison des blocages de l'API (1appel/sec)*/
    const matchResults = await getMatchResults();

    /* Affichage des résultats */
    return (
      <>
        <MatchCalendar data={dailyMatchs} title="Prochains matchs" />
        <MatchCalendar data={matchResults} title="Matchs précédants" />
      </>
    );
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
};

export default MatchTracker;
