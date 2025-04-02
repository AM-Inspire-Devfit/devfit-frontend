/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        "k.kakaocdn.net", 
        "lh3.googleusercontent.com",
        "example.com"
      ], 
  },
  compiler: {
        styledComponents: true, // styled-components 활성화
    }
};

export default nextConfig;
