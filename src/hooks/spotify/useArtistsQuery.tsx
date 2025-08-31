import { getArtists } from "@/api/spotify";
import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions } from "@/utils/query";
import type { SearchResponse, Artist } from "@/types/spotify";

interface UseArtistsQueryProps {
  debounceSearch: string;
  pageArtists: number;
  limit: number;
}

const emptyArtistsResponse: SearchResponse<Artist> = {
  artists: {
    href: '',
    total: 0,
    limit: 0,
    offset: 0,
    items: [],
    next: null,
    previous: null
  },
};

export const useArtistsQuery = ({
  debounceSearch,
  pageArtists,
  limit,
}: UseArtistsQueryProps) => {
  return useQuery<SearchResponse<Artist>>({
    queryKey: ['artists', debounceSearch, pageArtists],
    queryFn: () =>
      debounceSearch.trim()
        ? getArtists(debounceSearch, limit, pageArtists * limit)
        : emptyArtistsResponse,
    enabled: !!debounceSearch.trim(),
    placeholderData: (previousData) => previousData,
    ...defaultQueryOptions,
  });
};
