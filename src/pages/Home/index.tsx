import { loginSpotify } from "../../libs/auth";
import { Button } from "../../components/ui/button";
import { SpotifyLogoIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/artists");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SpotifyLogoIcon size={60} />
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Button onClick={loginSpotify}>Entrar com Spotify</Button>
    </div>
  )
}