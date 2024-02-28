const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    document: "/_offline",
  },
  reloadOnOnline: false,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
});

module.exports = nextConfig;
