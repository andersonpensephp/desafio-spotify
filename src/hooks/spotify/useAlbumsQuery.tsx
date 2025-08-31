import { getArtistAlbumsByQuery } from "@/api/spotify";
import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions } from "@/utils/query";
import type { SearchResponse, SimplifiedAlbum } from "@/types/spotify";

interface UseAlbumsQueryProps {
  debounceSearch: string;
  pageAlbums: number;
  limit: number;
  enabled?: boolean;
}

const emptyAlbumsResponse: SearchResponse<SimplifiedAlbum> = {
  albums: {
    href: '',
    total: 0,
    limit: 0,
    offset: 0,
    items: [],
    next: null,
    previous: null
  },
};

export const useAlbumsQuery = ({ debounceSearch, pageAlbums, limit, enabled }: UseAlbumsQueryProps) => {
  return useQuery({
    queryKey: ['albums', debounceSearch, pageAlbums],
    queryFn: () =>
      debounceSearch.trim()
        ? getArtistAlbumsByQuery(debounceSearch, limit, pageAlbums * limit)
        : emptyAlbumsResponse,
    placeholderData: (previousData) => previousData,
    enabled,
    ...defaultQueryOptions,
  });
};
