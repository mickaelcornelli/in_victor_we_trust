import Link from "next/link";
import { motion } from "framer-motion";

const IconicTeams = ({teams}) => {
  return (
    <section className="py-16 bg-gray-100">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-8">Les Équipes Iconiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {teams.map((team) => (
            <Link key={team.tid} href={`/equipes/${team.tid}`}>
              <div className="bg-white p-6 rounded-md shadow-md transition-transform hover:translate-x-[-10px] hover:translate-y-[10px] cursor-pointer h-full">
                <img
                  src={team.img}
                  alt={`Logo ${team.team}`}
                  className="w-full mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{team.team}</h3>
                <p className="text-gray-600 mb-4">{team.success}</p>
                <ul className="mb-4">
                  {team.legendaryPlayers.map((player, i) => (
                    <li key={i} className="text-gray-600">
                      {player}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700">{team.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default IconicTeams;
