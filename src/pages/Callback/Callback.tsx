import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || "";
const AUTH_URL = import.meta.env.VITE_SPOTIFY_AUTHORIZED || "";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {

    async function getToken() {
      // Captura o code tanto antes quanto depois do hash
      const hashIndex = window.location.href.indexOf("#");
      const queryString = hashIndex > -1 ? window.location.href.slice(0, hashIndex) : window.location.href;

      const codeMatch = queryString.match(/code=([^&]+)/);
      const code = codeMatch ? codeMatch[1] : null;

      const codeVerifier = localStorage.getItem("code_verifier");

      console.log(queryString);

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


        const response = await axios.post(AUTH_URL + "/api/token", body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        });

        const data = response.data;
        console.log('data', data);
        if (data) {
          localStorage.setItem("access_token", data?.access_token);
          localStorage.setItem("spotify_refresh", data.refresh_token);
          console.log("Token salvo");
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