"use client";

import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import Link from "next/link";

const Actuality = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Alternance des images des posters d'actualités
  const getRandomImage = (index) => {
    const imageName = `blog${(index % 15) + 1}.jpg`;
    return `url("/blog/${imageName}")`;
  };

  return (
    <section id="actualite" className="news mt-100vh text-white">
      <h2 className="text-4xl pb-8 text-center">Actualités et nouveautés</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
        {posts.map((post, index) => (
          <Link key={index} href={post.url}>
            <div
              className="max-w-md min-h-64 my-4 p-4 border rounded shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: getRandomImage(index),
                backgroundSize: "cover",
              }}
            >
              <h3 className="text-xl font-bold">{post.title}</h3>

              <div className="absolute left-0 bottom-0 rounded-r-md bg-white/80 p-1">
                <p className="text-black/50 text-xs">Source: {post.source}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Actuality;
