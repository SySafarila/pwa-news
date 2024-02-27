/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    document: "/_offline",
  },
  reloadOnOnline: false,
  runtimeCaching: [
    {
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkOnly',
      options: {
        cacheName: '/api/ping',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 2
        }
      }
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  nextConfig,
});
