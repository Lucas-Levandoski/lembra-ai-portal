/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false,
      },
      {
        source: '/portal',
        destination: '/portal/agenda',
        permanent: false,
      }
    ]
  },
  output: 'standalone',
};

export default nextConfig;
