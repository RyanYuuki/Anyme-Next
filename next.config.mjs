/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s4.anilist.co", "cdn.noitatnemucod.net", "media.kitsu.app"],
  },
  env: {
    CONSUMET_URL: process.env.CONSUMET_URL,
    HIANIME_URL: process.env.HIANIME_URL,
    PROXY_URL: process.env.PROXY_URL,
    MANGA_URL: process.env.MANGA_URL,
  },
};
export default nextConfig;
