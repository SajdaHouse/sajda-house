/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vtjclpwgljeqcdjmitvj.supabase.co" },
    ],
    minimumCacheTTL:9999999999
  },
};

export default nextConfig;
