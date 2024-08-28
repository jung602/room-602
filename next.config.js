/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/room-602' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://jung602.github.io/room-602' : '',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 프로덕션 빌드에서만 적용
      config.output.publicPath = `/room-602${config.output.publicPath}`;
    }
    return config;
  },
};

// 개발 환경에서만 rewrites 적용
if (process.env.NODE_ENV !== 'production') {
  nextConfig.rewrites = async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://erin-jung.com/:path*',
      },
    ];
  };
}

module.exports = nextConfig;