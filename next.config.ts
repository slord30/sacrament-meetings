import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    
    deviceSizes: [320, 375, 425, 640, 750, 828],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
