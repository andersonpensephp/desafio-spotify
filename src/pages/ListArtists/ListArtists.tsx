import { useAxios } from "../../hooks/useAxios";

export default function ListArtists() {
  const { data } = useAxios("https://api.spotify.com/v1/search?q=eminem&type=artist&limit=10", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  console.log(data);

  return (
    <div>
      <h1>Artistas</h1>
    </div>
  )
}