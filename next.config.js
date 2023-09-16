/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    if (!isServer) {
      config.resolve.fallback.modulePath = false;
    }
    return config;
  },
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
