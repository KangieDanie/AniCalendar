/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s4.anilist.co"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
