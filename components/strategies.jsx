const Strategies = () => {
  return (
    <div className="w-full p-6 bg-gray-900 shadow-md pt-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Le Jeu Moderne en NBA
        </h2>

        <div className="lg:flex lg:justify-between">
          {/* Colonne de gauche pour le texte */}
          <div className="lg:w-1/2 ">
            <div className="mb-6 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Évolution des Stratégies de Jeu
              </h3>
              <p className="text-white">
                L'évolution des stratégies de jeu en NBA a été marquée par
                plusieurs changements au fil des années. On observe une tendance
                vers un jeu plus axé sur le tir extérieur, avec une importance
                accrue accordée aux joueurs capables de marquer à distance. Les
                équipes mettent également l'accent sur la vitesse, la
                polyvalence et la défense pour rester compétitives dans un
                environnement de plus en plus dynamique.
              </p>
            </div>

            <div className="mb-6 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Technologies et Données Analytiques
              </h3>
              <p className="text-white">
                L'introduction de nouvelles technologies et de données
                analytiques a révolutionné la manière dont les équipes abordent
                le jeu. Les caméras de suivi des joueurs, les capteurs de
                mouvement et les outils d'analyse avancés fournissent des
                informations précieuses sur les performances individuelles et
                collectives. Les équipes utilisent ces données pour prendre des
                décisions éclairées, optimiser leurs stratégies de jeu et
                maximiser leur succès sur le terrain.
              </p>
            </div>
          </div>

          {/* Colonne de droite pour la vidéo */}
          <div className="lg:w-1/2 lg:pl-4">
            <div className="mb-6 border-b border-gray-300 pb-4 md:border-0 ">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Vidéo sur le Jeu Moderne
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <video className="w-full h-full rounded-md" controls>
                  <source src="/strategy.mp4" type="video/mp4" />
                  Votre navigateur ne prend pas en charge la balise vidéo.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategies;
