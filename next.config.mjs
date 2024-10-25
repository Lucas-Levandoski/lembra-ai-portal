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
        hostname: 'salembraassetsdev.blob.core.windows.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'salembraassets.blob.core.windows.net',
        port: '',
      },
    ],
  }
};

export default nextConfig;
