import { useQuery } from "@tanstack/react-query";
import { getAlbumTracks } from "@/api/spotify";
import { defaultQueryOptions } from "@/utils/query";

interface UseAlbumTracksQueryProps {
  id: string;
  limit: number;
  offset: number;
}

export const useAlbumTracksQuery = ({ id, limit, offset }: UseAlbumTracksQueryProps) => {
  return useQuery({
    queryKey: ['album-tracks', id],
    queryFn: () => getAlbumTracks(id, limit, offset),
    ...defaultQueryOptions,
  });
};