/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb'
    },
    typedRoutes: true
  }
};

export default nextConfig;
