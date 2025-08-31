import { useQuery } from "@tanstack/react-query";
import { getAlbumById } from "@/api/spotify";
import { defaultQueryOptions } from "@/utils/query";
import { useQueryClient } from "@tanstack/react-query";
import type { SearchResponse, SimplifiedAlbum } from "@/types/spotify";

interface UseAlbumByIdQueryProps {
  id: string;
  search: string;
  pageAlbums: number;
}

export const useAlbumByIdQuery = ({ id, search, pageAlbums }: UseAlbumByIdQueryProps) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbumById(id),
    initialData: () => {
      const cachedAlbums = queryClient.getQueryData<SearchResponse<SimplifiedAlbum>>([
        'albums',
        search,
        pageAlbums,
      ]);
      return cachedAlbums?.albums?.items.find((a) => a.id === id) || undefined;
    },
    ...defaultQueryOptions,
  });
};