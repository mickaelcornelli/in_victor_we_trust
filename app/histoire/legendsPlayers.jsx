import Link from "next/link";
import { motion } from "framer-motion";
import { cn, extractPlayerIdFromImageUrl } from "../../lib/utils";

const LegendsPlayers = ({ players }) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Les Légendes du Jeu
      </h2>

      {/* Joueurs les plus marquants */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {players.map((legend, index) => (
            <Link
              key={index}
              href={`/joueurs/${extractPlayerIdFromImageUrl(legend.img)}`}
            >
              <div className={`bg-white transition-all p-6  rounded-md shadow-md h-full ${legend.color === "#CE1141" ? "hover:bg-mj" : legend.color === "#FDB927" ? "hover:bg-lj" : legend.color === "#5a2d81" ? "hover:bg-wc" : "hover:bg-kaj"}`}>
                <span
                  className="animate-ping absolute inline-flex h-[30px] w-[30px] rounded-full opacity-75"
                  style={{ backgroundColor: `${legend.color}` }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-3 w-3 ml-2"
                  style={{ backgroundColor: `${legend.color}` }}
                ></span>
                <img
                  src={legend.img}
                  alt={legend.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{legend.name}</h3>
                <p className="text-gray-600 mb-4">{legend.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default LegendsPlayers;
