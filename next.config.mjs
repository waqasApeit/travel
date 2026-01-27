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

   async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
