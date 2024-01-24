/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.optimization.minimize = false

    return config
  },
};

export default nextConfig;
