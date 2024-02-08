import Image from "next/image";

const IntroNBA = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        <Image
          src="/logo.png"
          alt="NBA Logo"
          width={150}
          height={150}
          className="mx-auto mb-8 bg-transparent"
        />
        <h1 className="text-4xl font-bold mb-4">
          Explorons l'Histoire de la NBA
        </h1>
        <p className="text-lg mb-8">
          Découvrez les moments emblématiques, les légendes du jeu, et
          l'évolution fascinante de la National Basketball Association.
        </p>
        <p className="text-gray-400">
          La NBA, une ligue qui a façonné le basketball et captivé des millions
          à travers le monde.
        </p>
      </div>
    </section>
  );
};

export default IntroNBA;
