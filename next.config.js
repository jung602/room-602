/** @type {import('next').NextConfig} */

const path = require('path')
 
const nextConfig = {
    basePath: "/room-602",
    assetPrefix: '/room-602/',
    output: "export",
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
}

module.exports = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://jung602.github.io/room-602"
      : "",
  async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://erin-jung.com/:path*',
          },
        ]
      },
};