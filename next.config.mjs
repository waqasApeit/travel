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
   async redirects() {
    return [
     
      {
        source: '/.well-known/acme-challenge/:path*',
        destination: '/.well-known/acme-challenge/:path*',
        permanent: false,
      },
     
      {
        source: '/(.*)',
        destination: '/lander`',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
