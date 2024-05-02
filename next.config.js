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
      ? "https://깃허브아이디.github.io/레파지토리이름"
      : "",
};