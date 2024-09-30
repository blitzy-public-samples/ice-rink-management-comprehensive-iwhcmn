const withPWA = require('next-pwa');

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  // React strict mode for highlighting potential issues
  reactStrictMode: true,

  // Environment-specific variables
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },

  // PWA configuration
  pwa: {
    dest: 'public',
    disable: isDev,
    register: true,
    scope: '/',
    sw: 'service-worker.js',
  },

  // Custom webpack configurations
  webpack: (config, { isServer }) => {
    // Optimize SVG loading
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add any other custom webpack configurations here

    return config;
  },

  // Image optimization
  images: {
    domains: ['icerink-images.s3.amazonaws.com'], // Add your image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Internationalization
  i18n: {
    locales: ['en', 'fr'], // Add more locales as needed
    defaultLocale: 'en',
  },

  // Custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects and rewrites (if needed)
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ];
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.icerink.com/:path*',
  //     },
  //   ];
  // },
};

// Export the configuration with PWA support
module.exports = withPWA(nextConfig);

// Human tasks:
// TODO: Review and adjust environment-specific variables
// TODO: Confirm PWA settings and manifest details
// TODO: Verify internationalization settings