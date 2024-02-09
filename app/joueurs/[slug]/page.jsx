import Player from "../../../components/player";

export const metadata = {
  title: "Détail d'un joueur - In Victor We Trust",
  description:
    "Accédez au détail d'un joueur, sa saison, ses statistiques, une vidéo highlights etc...",
};

const page = ({ params }) => {
  const { slug } = params;

  return <Player slug={slug} />;
};

export default page;
