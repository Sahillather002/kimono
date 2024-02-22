/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.kitsu.io", "artworks.thetvdb.com", "s4.anilist.co"],
  },
};

export default nextConfig;
