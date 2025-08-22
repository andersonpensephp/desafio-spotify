import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = "a5fedad960cb4b98979e050172253ea5";
const REDIRECT_URI = "http://127.0.0.1:5173/callback";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {

    async function getToken() {
      const code = new URLSearchParams(window.location.search).get("code");
      const codeVerifier = localStorage.getItem("code_verifier");

      if (!code) {
        console.log("Nenhum código encontrado");
        return;
      }

      try {
        const body = new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier!,
        });


        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        });

        const data = response.data;

        if (data) {
          localStorage.setItem("access_token", data?.access_token);
          localStorage.setItem("spotify_refresh", data.refresh_token);

          navigate("/artists");
        } else {
          console.log("Nenhum token encontrado");
        }

      } catch (error) {
        console.log(error);
      }
    }

    getToken();
  }, [navigate]);

  return <div>Callback</div>;
}