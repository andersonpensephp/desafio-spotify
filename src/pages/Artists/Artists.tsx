import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../../api/spotify";
import { Card, CardContent } from "../../components/ui/card";

export default function Artists() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artists"],
    queryFn: () => getArtists<any>("roberto carlos"),
  })

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao buscar artistas</p>

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Artistas</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.artists.items.map((artist: any) => (
          <li key={artist.id}>
            <Card
              className="shadow-md hover:shadow-xl transition-shadow"
              onClick={() => window.location.href = `/artist/${artist.id}`}
            >
              <CardContent className="flex flex-col items-center p-4">
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full"
                />
                <h2 className="text-lg font-semibold">{artist.name}</h2>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}