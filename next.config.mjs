/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'konohaapi.1294a95cc7f2af89fcc3c7e6de9b440a.r2.cloudflarestorage.com',
      },
    ],
  },
}

export default nextConfig
