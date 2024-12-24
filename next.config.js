/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
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
      Object.assign(config.resolve.alias, {
        '/room-602': path.resolve(__dirname, 'public'),
      });
    }
    
    // Font file handling
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]'
      }
    });
    
    return config;
  }
};

module.exports = nextConfig;