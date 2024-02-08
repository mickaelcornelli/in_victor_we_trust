"use client";

import { useState, useEffect } from "react";
import { getPlayers } from "../api/api";
import { extractPlayerIdFromImageUrl } from "../lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { Button } from "../@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const SearchPlayer = () => {
  const [input, setInput] = useState("");
  const [players, setPlayers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchData = async () => {
    const result = await getPlayers(input);
   
    if (result.length !== 0) {
      setPlayers(result);
    }
  };

  useEffect(() => {
    input !== "" && setShowSuggestions(true);
  }, [input]);

  return (
    <div className="relative w-full">
      <form className="flex items-center justify-between">
        <input
          placeholder="Rechercher un joueur"
          type="text"
          className="bg-transparent w-full pl-2 pb-0.5 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      {showSuggestions && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="search"
              onClick={() => {
                input !== "" && fetchData();
              }}
            >
              {input !== "" && (
                <AiOutlineSend
                  className={`hover:text-emerald-100 text-emerald-400 transition-all ${
                    input !== "" && "animate-pulse"
                  }`}
                />
              )}
            </Button>
          </PopoverTrigger>
          {players.length > 0 && (
            <PopoverContent className="w-full mt-5 bg-zinc-950">
              <div className="grid gap-4 max-h-64 overflow-y-auto">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center gap-4 text-white"
                  >
                    <Link
                      href={`/joueurs/${extractPlayerIdFromImageUrl(
                        player.imgURL
                      )}`}
                    >
                      <div
                        className="flex gap-4"
                        onClick={() => setShowSuggestions(false)}
                      >
                        <Image
                          src={player.imgURL}
                          width={25}
                          height={25}
                          alt={player?.name}
                          className="object-contain rounded-xl"
                        />
                        {player.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      )}
    </div>
  );
};

export default SearchPlayer;
