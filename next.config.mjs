/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Change 'http, https' to just 'https'
        hostname: 'www.main.bkarogyam.com', // Remove the comma
        port: '', // Leave this empty for default port
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
