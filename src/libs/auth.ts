import { generateRandomString, generateCodeChallenge } from "../utils/pkce";

const CLIENT_ID = "a5fedad960cb4b98979e050172253ea5";
const REDIRECT_URI = "http://127.0.0.1:5173/callback";
const SCOPES = ["user-read-email", "user-read-private"];

export async function loginSpotify() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem("code_verifier", codeVerifier);

  const args = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join("%20"),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const authUrl = `https://accounts.spotify.com/authorize?${args.toString()}`;

  window.location.href = authUrl;
}
