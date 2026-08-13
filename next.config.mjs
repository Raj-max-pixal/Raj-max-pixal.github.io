/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint run separately — prevents Pages Router _document scan bug in Next.js 15
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
