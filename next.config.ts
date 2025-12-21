import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // strict mode 끄기

  // 모든 데이터 페칭 로깅
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
