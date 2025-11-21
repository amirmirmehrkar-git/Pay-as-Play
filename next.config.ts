import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow importing from playandpay-sdk
  transpilePackages: ['playandpay-sdk'],
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Bundle optimization
  // Note: swcMinify is deprecated in Next.js 16 (enabled by default)
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'recharts'],
  },

  // Turbopack config (Next.js 16+) - required to silence webpack warning
  turbopack: {
    // Empty config to use Turbopack by default
    // Webpack optimizations are handled automatically by Turbopack
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
