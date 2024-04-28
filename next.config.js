/** @type {import('next').NextConfig} */

const path = require('path')
 
const nextConfig = {
    basePath: "/room-602",
    output: "export",
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
}

module.exports = nextConfig
