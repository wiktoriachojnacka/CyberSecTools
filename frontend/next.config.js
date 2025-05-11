/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows TypeScript errors to be ignored at build time
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This configuration allows JavaScript files to import TypeScript files
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
}

module.exports = nextConfig
