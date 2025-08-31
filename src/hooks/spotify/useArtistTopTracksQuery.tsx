import { useQuery } from "@tanstack/react-query";
import { getArtistTopTracks } from "@/api/spotify";
import { defaultQueryOptions } from "@/utils/query";

interface UseArtistTopTracksQueryProps {
  id: string;
  country: string;
  enabled: boolean;
}

export const useArtistTopTracksQuery = ({ id, country, enabled }: UseArtistTopTracksQueryProps) => {
  return useQuery({
    queryKey: ['artist-top-tracks', id, country],
    queryFn: () => getArtistTopTracks(id!, country),
    enabled,
    ...defaultQueryOptions,
  });
};