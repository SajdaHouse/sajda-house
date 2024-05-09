/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sajdahouse.netlify.app" },
    ],
    minimumCacheTTL: 9999999999,
  },
};
export default nextConfig;
