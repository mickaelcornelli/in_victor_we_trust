import { motion } from "framer-motion";

const TemporalEvolution = ({ rulesAndEquipment, decades }) => {
 

  return (
    <section className="bg-gray-900 text-white py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container  mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-8">Évolution Temporelle</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Époques majeures */}
          <div>
            <h3 className="text-emerald-400 text-xl font-bold mb-4">
              Décennie par Décennie
            </h3>
            {decades.map((decade, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">{decade.title}</h4>
                <p className="md:text-left text-gray-400">{decade.content}</p>
              </div>
            ))}
          </div>

          {/* Règles et Équipements */}
          <div>
            <h3 className="text-emerald-400 text-xl font-bold mb-4">
              Règles et Équipements
            </h3>
            {rulesAndEquipment.map((point, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">{point.title}</h4>
                <p className="md:text-left text-gray-400">{point.content}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TemporalEvolution;
