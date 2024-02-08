import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="py-48 md:py-0 md:h-[820px] relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-full md:h-[820px] flex flex-col justify-center items-start">
            <h1 className="text-center xl:text-left mb-6 uppercase text-white text-6xl">In Victor We Trust.</h1>
            <p className="mb-10 text-lg mx-auto text-left xl:text-left xl:mx-0 text-white/50">A travers ce projet découvez les équipes de la NBA, les joueurs, les résultats des équipes, l'actualités tout au long de la saison et bien plus encore...</p>
            <div className="flex items-center gap-4 mx-auto xl:mx-0">
              <Link href="/equipes" className="mx-auto md:mx-0">
                <button className="btn btn-accent bg-blue-900">Les équipes</button>
              </Link>
              <Link href="/histoire" className="mx-auto md:mx-0">
                <button className="btn btn-accent bg-emerald-900">Découvrir la NBA</button>
              </Link>
            </div>
          </div>
          
          <div className="hidden xl:flex">
            <Image
              src='/hero.webp'
              width={765}
              height={480}
              quality={100}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero