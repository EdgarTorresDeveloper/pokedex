/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  env: { NEXTAUTH_URL: process.env.NEXTAUTH_URL },
};

module.exports = nextConfig;
