/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/frontend-assignment',
  assetPrefix: '/frontend-assignment/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
