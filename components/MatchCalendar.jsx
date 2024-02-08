import Link from "next/link";

const MatchCalendar = ({ data, title }) => {
 
  return (
    <section
      id="dailymatchs"
      className="w-full mx-auto p-6 rounded-md shadow-md mt-8 mb-8"
      style={{
                backgroundImage:"url(/matchs_background.webp)",
                backgroundSize: "cover",
              }}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-100">{title}</h2>
      {data?.games.map((match) => {
        const scheduledDate = new Date(match.scheduled);
        const formattedDate = scheduledDate.toISOString().split("T")[0];

        return (
          <div key={match.id} className="mb-4 p-4 rounded-md bg-gray-800/70">
            <Link href={`/match/${match.id}`}>
              <p className="text-lg font-bold text-white">
                {match.home.name} vs {match.away.name}
              </p>
              <p className="text-white/60">
                Status :{" "}
                {match.status === "closed"
                  ? "Terminé"
                  : match.status === "scheduled"
                  ? "Programmé"
                  : match.status}
              </p>
              <p className="text-white/60">Date : {formattedDate}</p>
              <p className="text-white/60">Lieu : {match.venue.name}</p>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default MatchCalendar;
