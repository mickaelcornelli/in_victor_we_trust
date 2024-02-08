/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.imgur.com",
      },
      {
        protocol: 'https',
        hostname: "content.sportslogos.net",
      },
      {
        protocol: 'https',
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: 'https',
        hostname: "img.clerk.com",
      },
      {
        protocol: 'https',
        hostname: "ak-static.cms.nba.com",
      },
      {
        protocol: 'https',
        hostname: "a.espncdn.com",
      },
      {
        protocol: 'https',
        hostname: "cdn.nba.com",
      },
      {
        protocol: 'http',
        hostname: "a.espncdn.com",
      },
      {
        protocol: 'https',
        hostname: "avatars.githubusercontent.com",
      },
       
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig;
