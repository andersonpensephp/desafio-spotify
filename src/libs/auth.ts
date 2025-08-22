import {
  generateRandomString,
  generateCodeChallenge
} from "../utils/pkce";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || "";
const SCOPES = ["user-read-email", "user-read-private"];
const AUTH_URL = import.meta.env.VITE_SPOTIFY_AUTH_URL || "";

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

  const authUrl = `${AUTH_URL}?${args.toString()}`;

  window.location.href = authUrl;
}
