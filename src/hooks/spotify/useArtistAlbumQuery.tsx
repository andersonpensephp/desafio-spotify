import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions } from "@/utils/query";
import { getArtistAlbums } from "@/api/spotify";

interface UseArtistAlbumQueryProps {
  id: string;
  limit: number;
  page: number;
}

export const useArtistAlbumQuery = ({ id, limit, page }: UseArtistAlbumQueryProps) => {
  return useQuery({
    queryKey: ['artist-albums', id, limit, page],
    queryFn: () => getArtistAlbums(id, limit, page * limit),
    placeholderData: (previousData) => previousData,
    ...defaultQueryOptions,
  });
};