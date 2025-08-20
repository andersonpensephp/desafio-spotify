import { loginSpotify } from "../../libs/auth";
import { Button } from "../../components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <h1>Spotify API Test</h1>
      <Button onClick={loginSpotify}>Login com Spotify</Button>
    </div>
  )
}