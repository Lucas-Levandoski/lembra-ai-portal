/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portal/agenda',
        permanent: false,
      },
      {
        source: '/portal',
        destination: '/portal/agenda',
        permanent: false,
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3v0px0pttie1i.cloudfront.net',
        port: '',
        pathname: '/uploads/user/**',
      },
    ],
  }
};

export default nextConfig;
