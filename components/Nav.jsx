"use client";

import SearchPlayer from "./SearchPlayer";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import { FaGithub } from "react-icons/fa6";

const Nav = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="sticky top-0 flex justify-between md:justify-start bg-gradient-to-r from-spurs-black to-spurs-gray text-white p-4 z-50">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex relative text-spurs-black cursor-pointer w-[40px] lg:w-[80px] transition-transform duration-300 hover:translate-y-1">
          <Image src="/hero.webp" alt="logo" width={40} height={40} />
          <div className="basketball">
            <div className="ball"></div>
          </div>
        </div>
      </Link>

      {/* Navbar */}
      <div className="hidden lg:flex gap-4 xl:gap-8 items-center">
        <Link href={"/#actualite"}>
          <div className="cursor-pointer transition-transform duration-300 hover:translate-y-1">
            Actualité
          </div>
        </Link>

        <Link href={"/classement"}>
          <div className="cursor-pointer transition-transform duration-300 hover:translate-y-1">
            Classement
          </div>
        </Link>

        <Link href={"/equipes"}>
          <div className="cursor-pointer transition-transform duration-300 hover:translate-y-1">
            Équipes
          </div>
        </Link>

        <Link href={"/joueurs"}>
          <div className="cursor-pointer transition-transform duration-300 hover:translate-y-1">
            Joueurs
          </div>
        </Link>

        <Link href={"/histoire"}>
          <div className="cursor-pointer transition-transform duration-300 hover:translate-y-1">
            Histoire
          </div>
        </Link>
      </div>

      {/* Recherche */}
      <div className="flex items-center border-b border-gray-600 w-full lg:w-[450px] mx-8">
        <CiSearch size={22} className="animate-wiggle" />
        <SearchPlayer size={22} />
      </div>

      {/*Github Auteur*/}
      <div className="hidden lg:flex absolute right-4 top-1 bottom-0">
        <Link href="https://github.com/mickaelcornelli">
          <div className="cursor-pointer flex flex-col items-center justify-center transition-transform duration-300 hover:translate-x-1">
            <FaGithub size={25} />
            Mon profil
          </div>
        </Link>
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden items-center">
        <div className="cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <SlClose /> : <RxHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
