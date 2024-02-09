import Players from "../../components/players"

export const metadata = {
  title: "Liste des joueurs - In Victor We Trust",
  description:
    "Une liste a scroll de tous les joueurs de la NBA avec des détails de joueurs et leur photo.",
};

const page =  () => {
  return <Players  />;
};

export default page