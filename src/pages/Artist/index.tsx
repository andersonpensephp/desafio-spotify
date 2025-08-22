import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtist, getArtistTopTracks } from "@/api/spotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AlbumsList from "./components/AlbumsList/AlbumsList";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import ArtistSkeleton from "./Skeleton/ArtistSkeleton";
import { TracksListCard } from "@/components/common/TracksListCard/TracksListCard";
import { ErrorState } from "@/components/common/ErrorState/ErrorState";

export default function Artist() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState("albums");
  const { search } = useContext(SearchContext)
  const queryClient = useQueryClient();

  const navigate = useNavigate()

  const {
    data: artist,
    isLoading: artistLoading,
    error: artistError,
    refetch: refetchArtist,
  } = useQuery({
    queryKey: ["artists", id],
    queryFn: () => getArtist<any>(id!),
    initialData: () => {
      const cachedArtists = queryClient.getQueryData<any>(["artists", search]);
      return cachedArtists?.artists?.items.find((a: any) => a.id === id) || undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const {
    data: tracks,
    error: tracksError,
    refetch: refetchTracks
  } = useQuery({
    queryKey: ["tracks", id],
    queryFn: () => getArtistTopTracks<any>(id!, "BR"),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const handleRetry = useCallback(() => {
    refetchArtist()
    refetchTracks()
  }, [tab, refetchArtist, refetchTracks])

  const tracksList = tracks?.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    albumName: track.album.name,
    albumImage: track.album.images[0].url,
    artists: track.artists,
    duration_ms: track.duration_ms,
  }))

  return (
    <div className="p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/artists")}>Artistas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{artist?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {artistLoading ? <ArtistSkeleton /> : (artistError || tracksError) ? (
        <ErrorState
          message={artistError?.message || "Erro ao buscar artista"}
          onRetry={handleRetry}
        />
      ) : (
        <>
          <div className="flex items-center gap-6 mb-6">
            <img
              src={artist?.images[0].url}
              alt={artist?.name}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{artist?.name}</h1>
              <p className="text-gray-500">{artist?.followers?.total} seguidores</p>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${artist?.popularity}%` }}
                />
              </div>
            </div>
          </div>
          <Tabs
            defaultValue={tab}
            onValueChange={(value) => {
              setTab(value)
              navigate(`/artist/${id}`)
            }}
          >
            <div className="flex items-center gap-6 mb-6">
              <TabsList>
                <TabsTrigger value="albums">Albuns</TabsTrigger>
                <TabsTrigger value="top-tracks">Principais faixas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="albums">
              <AlbumsList />
            </TabsContent>
            <TabsContent value="top-tracks">
              <TracksListCard tracks={tracksList} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}