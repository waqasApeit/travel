/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true, // optional: ignore all lint errors on build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS hosts
      },
      {
        protocol: "http",
        hostname: "**", // allow all HTTP hosts (optional)
      },
    ],
  },
  
};

export default nextConfig;
