/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake lucide-react supaya bundle tetap kecil
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
