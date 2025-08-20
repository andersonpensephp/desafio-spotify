import { useAxios } from "../../hooks/useAxios";
import { loginSpotify } from "../../libs/auth";

export default function Home() {
  const { data } = useAxios("https://api.spotify.com/v1/artists", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <h1>Spotify API Test</h1>
      <button onClick={loginSpotify}>Login com Spotify</button>
    </div>
  )
}