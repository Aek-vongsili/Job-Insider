/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
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
  async rewrites() {
    return [
      {
        source: "/__/auth/:path(.*)",
        destination: "https://job-insider-b06ee.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};
