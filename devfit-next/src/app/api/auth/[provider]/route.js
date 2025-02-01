export async function GET(req, { params }) {
    const { provider } = params;
  
    let oauthUrl = "";
    
    if (provider === "google") {
      oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=email profile&response_type=code`
    } else if (provider === "kakao") {
      oauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`
      ;
    }
  
    return Response.json({ url: oauthUrl });
  }