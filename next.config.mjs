/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
      {
        hostname: "kr.object.ncloudstorage.com",
      },
      {
        hostname: "dive-in-bucket.kr.object.ncloudstorage.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
