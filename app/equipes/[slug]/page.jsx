export const metadata = {
  title: "Détail d'une équipe - In Victor We Trust",
  description:
    "Découvrez le détail d'une équipe, sa composition d'équipe, son historique, le maillot , le stade et bien d'autre informations...",
};

import Team from "./team";

const page = async ({ params }) => {
  const { slug } = params;

  return <Team slug={slug} />;
};

export default page;
