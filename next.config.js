/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // by default / try false to make local storage work
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
