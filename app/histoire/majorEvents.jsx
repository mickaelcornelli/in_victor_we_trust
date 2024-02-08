"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MajorEvents = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: "-100px 0px",
    });
  
    useEffect(() => {
      if (inView) {
        controls.start({ opacity: 1, x: 0 });
      }
    }, [controls, inView]);

  return (
    <div className="w-full mx-auto p-6 bg-gray-900 shadow-md pt-8 hover:scale-[101%] transition-all">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Événements Majeurs de la NBA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Premier événement */}
        <motion.div
          ref={ref}
          animate={controls}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-6 bg-gray-800 p-4 rounded-md"
        >
          <a
            target="_blank"
            href="https://www.nba.com/allstar/2024"
            rel="noopener noreferrer"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              ⭐ All-Star Game
            </h3>
            <p className="text-white">
              L'All-Star Game de la NBA est un événement annuel mettant en
              vedette les meilleurs joueurs de la ligue. Il comprend des
              compétitions de tirs à trois points, de dunks, et le match
              All-Star proprement dit.
            </p>
          </a>
        </motion.div>

        {/* Deuxième événement */}
        <motion.div
          ref={ref}
          animate={controls}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-6 bg-gray-800 p-4 rounded-md"
        >
          <a
            target="_blank"
            href="https://www.basketusa.com/nba-finals/"
            rel="noopener noreferrer"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              🏀 Finales NBA
            </h3>
            <p className="text-white">
              Les Finales NBA opposent les champions des conférences Est et
              Ouest pour déterminer le champion de la saison. C'est le point
              culminant de la saison et attire une audience mondiale.
            </p>
          </a>
        </motion.div>
        {/* Troisième événement */}
        <motion.div
          ref={ref}
          animate={controls}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-6 bg-gray-800 p-4 rounded-md"
        >
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=aiULFwT6R30"
            rel="noopener noreferrer"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              🕵️‍♂️ Moments Mémorables
            </h3>
            <p className="text-white">
              La NBA est remplie de moments spéciaux et de performances
              mémorables. Que ce soit des buzzer-beaters, des performances
              individuelles exceptionnelles ou des rivalités épiques, ces
              moments restent gravés dans l'histoire de la ligue.
            </p>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default MajorEvents;
