import Link from 'next/link';

const SearchModal = ({ players }) => {
  return (
    <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-b-md z-10 mt-1 overflow-hidden w-full">
      {/* Affichez les suggestions ici */}
      {players.map((player) => (
        <Link key={player.id} href={`/joueurs/${player.id}`}>
          <div className="cursor-pointer p-2 hover:bg-gray-200">{player.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default SearchModal;
