import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArtistAlbums } from '@/api/spotify';
import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { PaginationComponent } from '@/components/common/Pagination/Pagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/date';

import AlbumsListSkeleton from './Skeleton';

const limit = import.meta.env.VITE_LIMIT_PER_PAGE;

export default function AlbumsList() {
  const [page, setPage] = useState(0);

  const { id } = useParams();

  const {
    data: albums,
    isFetching,
    error: albumsError,
    refetch: refetchAlbums,
  } = useQuery({
    queryKey: ['albums', id, limit, page],
    queryFn: () => getArtistAlbums<any>(id!, limit, page * limit),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const totalAlbums = albums?.total ?? 0;
  const totalPages = Math.ceil(totalAlbums / limit);

  const handleRetry = useCallback(() => {
    refetchAlbums();
  }, [refetchAlbums]);

  return (
    <div>
      {albumsError && (
        <ErrorState
          message={albumsError?.message || 'Erro ao buscar albuns'}
          onRetry={handleRetry}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isFetching ? (
          <AlbumsListSkeleton />
        ) : (
          albums?.items.map((album: any) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md hover:shadow-xl transition-shadow pt-0 pl-0 pr-0">
                <CardHeader className="p-0">
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-full h-54 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>
                    <h2>{album.name}</h2>
                  </CardTitle>
                  <CardDescription>{formatDate(album.release_date, 'dd/MM/yyyy')}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <PaginationComponent totalPages={totalPages} page={page} setPage={setPage} />
      )}
    </div>
  );
}
