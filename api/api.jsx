import axios from "axios";
import { NBAList } from "../constants";
import { extractPlayerIdFromImageUrl } from "../lib/utils";

const balldontlie_API = axios.create({
  baseURL: "https://www.balldontlie.io/api/v1/",
});

// Récupérer tous les équipes
export const getTeams = async () => {
  try {
    const response = await balldontlie_API.get("/teams");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Récupérer les joueurs depuis la barre de recherche
export const getPlayers = async (input) => {
  try {
    /*  const response = await balldontlie_API.get(`/players?search=${input}`); 
        return response.data; */
    const searchTerm = input.toLowerCase().trim();

    const filteredPlayers = NBAList.players.filter((player) => {
      return player.name && player.name.toLowerCase().includes(searchTerm);
    });

    return filteredPlayers;
  } catch (error) {
    console.log(
      "getPlayers_ERROR",
      error.message ||
        (error.response && error.response.statusText) ||
        "Erreur inconnue"
    );
  }
};

//Récupérer la liste de tous les joueurs
export const getAllPlayers = async ({ page }) => {
  try {
    const response = await balldontlie_API.get(
      `/players?per_page=100&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log("getAllPlayers_ERROR", error.statusText);
  }
};

// Récupérer un joueur spécifique par rapport à son ID (généré via le nom de son image) vu que l'api ne fourni aucune UID
export const getSpecificPlayer = async (slug) => {
  try {
    return NBAList.players.find(
      (player) => extractPlayerIdFromImageUrl(player.imgURL) == slug
    );
  } catch (error) {
    console.log(
      "getSpecificPlayer_ERROR",
      error.message ||
        (error.response && error.response.statusText) ||
        "Erreur inconnue"
    );
  }
};

// Récupérer le nom de l'équipe par rapport à son TeamID
export const getTeamName = (tid) => {
  try {
    return NBAList.teams.find((team) => team.tid == tid).name;
  } catch (error) {
    console.log(
      "getSpecificPlayer_ERROR",
      error.message ||
        (error.response && error.response.statusText) ||
        "Erreur inconnue"
    );
  }
};

// Chercher la premiere vidéo highlights youtube selon un keyword
export const researchKeywordOnYoutube = async (keywords) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: keywords,
          type: "video",
          maxResults: 1,
          key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
        },
      }
    );
    return response.data.items[0]?.id.videoId;
  } catch (error) {
    console.log("researchKeywordOnYoutube", error.statusText);
  }
};

// Récupérer le détails d'une équipe
export const getTeamDetails = async (uid) => {
  try {
    const response = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/teams/${uid}/profile.json?api_key=${process.env.NEXT_PUBLIC_SPORTRADAR_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching getTeamDetails", error.message);
  }
};

// Récupérer le classement NBA
export const getNbaStandings = async (season) => {
  try {
    const response = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/${season}/REG/standings.json?api_key=${process.env.NEXT_PUBLIC_SPORTRADAR_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching NBA standings:", error.message);
  }
};

// Récupérer le logo d'une équipe
export const getTeamLogo = async (teamName) => {
  try {
    const searchTerm = teamName.toLowerCase().trim();
    const foundTeam = NBAList.teams.find((team) => {
      return team.name && team.name.toLowerCase() === searchTerm;
    });
    return foundTeam ? foundTeam.imgURL : null; // Retourne l'URL de l'image si l'équipe est trouvée, sinon null
  } catch (error) {
    console.log(error);
  }
};

// Recupérer les blogs news
export const getPosts = async () => {
  const options = {
    method: "GET",
    url: "https://nba-latest-news.p.rapidapi.com/articles",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_KEY,
      "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Details d'un match
export const getGameSummary = async (id) => {
  try {
    const response = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/games/${id}/summary.json?api_key=${process.env.NEXT_PUBLIC_SPORTRADAR_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Récupérer les résultat précédants des match de la veille
export const getMatchResults = async () => {
  try {
    const currentDate = new Date();
    // Soustraire un jour à la date actuelle
    currentDate.setDate(currentDate.getDate() - 1);

    // Obtenez l'année, le mois et le jour de la nouvelle date (la veille)
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const response = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/games/${year}/${month}/${day}/schedule.json?api_key=${process.env.NEXT_PUBLIC_SPORTRADAR_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Récupérer le planning des match du jour
export const getMatchsOfTheDay = async () => {
  try {
    const currentDate = new Date();
    // Obtenez l'année, le mois et le jour
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const response = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/games/${year}/${month}/${day}/schedule.json?api_key=${process.env.NEXT_PUBLIC_SPORTRADAR_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Récupérer les strawpoll
export const getStrawpoll = async (pollId) => {
  const options = {
    method: "GET",
    url: `https://api.strawpoll.com/v3/polls/${pollId}`,
    headers: {
      Accept: "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_STRAWPOLL_KEY,
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};
