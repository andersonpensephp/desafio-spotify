import { motion } from 'framer-motion';

import { useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { PaginationComponent } from '@/components/common/Pagination/Pagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SimplifiedAlbum } from '@/types/spotify';
import { formatDate } from '@/utils/date';
import { useArtistAlbumQuery } from '@/hooks/spotify/useArtistAlbumQuery';

import AlbumsListSkeleton from './Skeleton';

const limit = import.meta.env.VITE_LIMIT_PER_PAGE;

export default function AlbumsList() {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const {
    data: albums,
    isFetching,
    error: albumsError,
    refetch: refetchAlbums,
  } = useArtistAlbumQuery({ id: id!, limit, page });

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
          albums?.items.map((album: SimplifiedAlbum) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                onClick={() => navigate(
                  `/album/${album.id}`,
                  {
                    state: {
                      from: location.pathname + location.search,
                      breadcrumbLabel: 'artist'
                    }
                  }
                )}
                className="shadow-md hover:shadow-xl transition-shadow pt-0 pl-0 pr-0 cursor-pointer"
              >
                <CardHeader className="p-0">
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-full h-54 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2">
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
