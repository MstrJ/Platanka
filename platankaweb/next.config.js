/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["localhost", "host.docker.internal"], // Add the hostname(s) you want to allow

    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 's3.amazonaws.com',
    //     port: '',
    //     pathname: '/my-bucket/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
