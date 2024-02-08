import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">ERREUR 404</h1>
      <p className="text-lg mb-8">
        Malheureusement, la page que vous recherchez n'existe pas. Veuillez
        corriger votre recherche et réessayer.
      </p>
      <div className="flex space-x-4">
        <Link className="bg-black text-white py-2 px-4 rounded-md hover:text-emerald-500 hover:bg-black/80 font-semibold transition-all" href="/">
          Retour à l'accueil
        </Link>
        <Link
          href="https://github.com/mickaelcornelli"
          className="bg-black text-emerald-400 py-2 px-4 rounded-md hover:text-white/90 hover:bg-black/80 font-semibold transition-all"
        >
          Visiter mon GitHub
        </Link>
      </div>
      <Image
        src="/basketball_error.png"
        alt="Erreur"
        className="w-64 h-64 mt-8 object-contain"
        width={320}
        height={320}
      />
    </div>
  );
}
