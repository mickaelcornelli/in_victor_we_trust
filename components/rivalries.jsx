import { motion } from "framer-motion";

const Rivalries = ({teams}) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Les rivalités historiques
      </h2>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {teams.map((rivalry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md hover:scale-105 transition-transform"
            >
              <a target="_blank" href={rivalry.url} rel="noopener noreferrer">
                <img
                  src={rivalry.img}
                  alt={rivalry.rivalry}
                  className="w-full object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {rivalry.rivalry}
                </h3>
                <p className="text-gray-600 mb-4">{rivalry.description}</p>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Rivalries;
