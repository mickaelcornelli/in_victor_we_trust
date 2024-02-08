"use client"

import Link from 'next/link';
import Nav from './Nav'
import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Afficher/cacher le menu burger sur mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Nav
        isMenuOpen={isMobileMenuOpen}
        toggleMenu={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[3.75rem] w-[100%] h-[100vh] text-white right-0 bottom-0 bg-gradient-to-r from-spurs-black to-spurs-gray  p-4 z-50 flex flex-col items-end gap-4">
          <Link href={'/#actualite'} onClick={toggleMobileMenu}>
            <div className="cursor-pointer">Actualité</div>
          </Link>

          <Link href={'/classement'} onClick={toggleMobileMenu}>
            <div className="cursor-pointer">Classement</div>
          </Link>

          <Link href={'/equipes'} onClick={toggleMobileMenu}>
            <div className="cursor-pointer">Équipes</div>
          </Link>

          <Link href={'/joueurs'} onClick={toggleMobileMenu}>
            <div className="cursor-pointer">Joueurs</div>
          </Link>

          <Link href={'/histoire'} onClick={toggleMobileMenu}>
            <div className="cursor-pointer">Histoire</div>
          </Link>
        </div>
      )}
    </>

  )
}

export default Header