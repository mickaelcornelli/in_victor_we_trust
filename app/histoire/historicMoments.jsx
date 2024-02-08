import { motion } from "framer-motion";

const HistoricMoments = ({ moments }) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Moments cultes</h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {moments.map((moment, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md hover:scale-105 transition-transform"
            >
              <a target="_blank" href={moment.url} rel="noopener noreferrer">
                <img
                  src={moment.img}
                  alt={moment.moment}
                  className="w-full object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{moment.moment}</h3>
                <p className="text-gray-600 mb-4">{moment.description}</p>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HistoricMoments;
