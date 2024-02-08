'use client'

import React from 'react';
import { FaFacebook, FaInstagram, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube, FaTwitch, FaArrowUp, FaApple, FaAndroid } from 'react-icons/fa';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-8 relative md:min-h-[200px]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Restez connecté avec nous sur les réseaux sociaux :</h2>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://www.snapchat.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200">
            <FaSnapchatGhost className="w-6 h-6" />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaTiktok className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
            <FaYoutube className="w-6 h-6" />
          </a>
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
            <FaTwitch className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center md:flex md:justify-between">
        <p className="text-sm md:text-left mb-4 md:mb-0">© 2024 In Victor We Trust. Tous droits réservés</p>
        <div className="md:flex items-center">
          <p className="text-md md:text-left mb-4 md:mb-0 md:mr-4">Télécharger notre application :</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="hover:text-gray-300">
              <FaApple className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-500">
              <FaAndroid className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <button onClick={scrollToTop} className="text-white bg-blue-950 p-2 rounded-full transition-all hover:bg-blue-600 focus:outline-none">
          <FaArrowUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
