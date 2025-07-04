const isGithubPages = process.env.NODE_ENV === 'production';
const repo = 'VisionLP'; // Nombre del repo exacto

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
