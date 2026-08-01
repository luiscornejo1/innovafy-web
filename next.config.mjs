/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita conflictos de escritura en .next en Windows (antivirus / indexadores)
  distDir: "node_modules/.cache/next",
  typedRoutes: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "C:\\\\System Volume Information/**",
          "C:\\\\swapfile.sys",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
