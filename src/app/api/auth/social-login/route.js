import axios from "axios";

export async function POST(req) {
  try {
    console.log("정상적으로 요청 중")
    const { oauthProvider, code } = await req.json();

    const apiUrl = `${process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI}/auth/social-login?oauthProvider=${encodeURIComponent(oauthProvider.toUpperCase())}`;
    console.log(apiUrl)
    
    const response = await axios.post(
      apiUrl,
      { code }, // POST 요청 body
      { headers: { "Content-Type": "application/json" } } 
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
