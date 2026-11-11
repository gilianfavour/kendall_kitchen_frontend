import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    // In development, skip the Next.js image optimiser entirely so backend
    // images served from 127.0.0.1:8000 are loaded directly by the browser
    // without going through the /_next/image proxy (which can fail to reach
    // the local Laravel server from inside the Next.js process).
    unoptimized: isDev,
    // Allow quality=90 used throughout the codebase (default list only includes 75)
    qualities: [75, 90],
    remotePatterns: [
      {
        // Laravel dev server via 127.0.0.1 (matches APP_URL in .env)
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        // Also allow localhost for browser-side preview
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        // Production backend — mgt.kendallkitchen.biz
        protocol: 'https',
        hostname: '**.kendallkitchen.biz',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
