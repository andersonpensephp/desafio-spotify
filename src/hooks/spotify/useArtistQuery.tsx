import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/api/spotify";
import { defaultQueryOptions } from "@/utils/query";
import { useQueryClient } from "@tanstack/react-query";
import type { SearchResponse, Artist } from "@/types/spotify";

interface UseArtistQueryProps {
  id: string;
  search: string;
  pageArtists?: number;
}

export const useArtistQuery = ({ id, search, pageArtists }: UseArtistQueryProps) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtist(id),
    initialData: () => {
      const cachedArtists = queryClient.getQueryData<SearchResponse<Artist>>([
        'artists',
        search,
        ...(pageArtists !== undefined ? [pageArtists] : []),
      ]);
      return cachedArtists?.artists?.items.find((a: Artist) => a.id === id) || undefined;
    },
    ...defaultQueryOptions,
  });
};
