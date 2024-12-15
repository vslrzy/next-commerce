/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_SOURCE,
      },
    ],
  },
};
