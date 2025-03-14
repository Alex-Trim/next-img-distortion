/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "locomotive-scroll$": "locomotive-scroll/dist/locomotive-scroll.esm.js",
    };
    return config;
  },
};

export default nextConfig;
