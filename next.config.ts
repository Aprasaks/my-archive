import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // 노션 업로드 파일
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 노션 랜덤 커버
      },
      {
        protocol: 'https',
        hostname: 'megaeconomy.co.kr', // 👈 방금 형이 쓴 이미지 사이트 추가!
      },
    ],
  },
};

export default nextConfig;
