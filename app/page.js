import Hero from "../components/Hero";
import VideoHero from "../components/VideoHero"
import MatchTracker from "../components/MatchTracker"
import Actuality from "../components/Actuality";
import StrawPollEmbed from "../components/StrawPollEmbed";
import { pollIds } from "../constants/index"

export default function Home() {
  return (
    <>

      <VideoHero/>

      <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-zinc-900 md:p-24">
        <Hero />
        <Actuality />

        {/* Sondages Strawpoll */}
        {pollIds.length > 0 &&
          <>
            <h2 className="text-4xl pb-8 text-white text-center ">Sondage sur la saison en cours</h2>
            <div className="w-full flex flex-col md:flex-row flex-wrap gap-4">
              {pollIds.map((pollId, index) => (
                <StrawPollEmbed
                  key={index}
                  pollId={pollId}
                />
              ))}
            </div>
          </>
        }

       <MatchTracker /> 
      </main>
    </>
  );
}
