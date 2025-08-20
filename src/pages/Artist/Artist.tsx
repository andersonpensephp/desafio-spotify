import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtist, getArtistTopTracks } from "@/api/spotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsList from "../AlbumsList/AlbumsList";

export default function Artist() {
  const { id } = useParams();

  const { data: artist, isLoading, error } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist<any>(id!),
  });

  const { data: tracks } = useQuery({
    queryKey: ["tracks", id],
    queryFn: () => getArtistTopTracks<any>(id!, "BR"),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar artista</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={artist.images[0].url}
          alt={artist.name}
          className="w-32 h-32 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="text-gray-500">{artist.followers.total} seguidores</p>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${artist.popularity}%` }}
            />
          </div>
        </div>
      </div>
      <Tabs defaultValue="albums">
        <TabsList>
          <TabsTrigger value="albums">Albuns</TabsTrigger>
          <TabsTrigger value="top-tracks">Principais faixas</TabsTrigger>
        </TabsList>
        <TabsContent value="top-tracks">
          {tracks?.tracks?.map((track: any) => (
            <div key={track.id}>
              <p>{track.name}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}