/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true, // styled-components 활성화
      },
    images: {
      domains: ['k.kakaocdn.net', 'lh3.googleusercontent.com'], // 허용할 외부 도메인 추가
    },
};

export default nextConfig;
