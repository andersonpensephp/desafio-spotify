import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { useCallback, useContext, useEffect, useMemo } from 'react';

import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { PaginationComponent } from '@/components/common/Pagination/Pagination';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Artist, SimplifiedAlbum } from '@/types/spotify';

import { getArtistAlbumsByQuery, getArtists } from '../../api/spotify';
import { SearchContext } from '../../context/SearchContext';
import { useDebounce } from '../../hooks/useDebounce';
import ArtistsAlbumsListSkeleton from './Skeleton/ArtistsAlbumsListSkeleton';
import { AlbumsItem } from './components/AlbumsItem/AlbumsItem';
import { ArtistsItem } from './components/ArtistsItem/ArtistsItem';

const limit = import.meta.env.VITE_LIMIT_PER_PAGE;

const DEBOUNCE_DELAY = 600;

export default function Artists() {
  const { search, setSearch, tab, setTab, pageArtists, setPageArtists, pageAlbums, setPageAlbums } =
    useContext(SearchContext);
  const debounceSearch = useDebounce(search, DEBOUNCE_DELAY);

  // Query de artistas
  const {
    data: artistsData,
    isFetching: isArtistsFetching,
    error: artistsError,
    refetch: refetchArtists,
  } = useQuery({
    queryKey: ['artists', debounceSearch, pageArtists],
    queryFn: () => getArtists(debounceSearch, limit, pageArtists * limit),
    enabled: !!debounceSearch,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  // Query de albuns
  const {
    data: albumsData,
    isFetching: isAlbumsFetching,
    error: albumsError,
    refetch: refetchAlbums,
  } = useQuery({
    queryKey: ['albums', debounceSearch, pageAlbums],
    queryFn: () => getArtistAlbumsByQuery(debounceSearch, limit, pageAlbums * limit),
    enabled: !!debounceSearch,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    staleTime: 10 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
    },
    [setSearch]
  );

  const handleRetry = () => {
    if (tab === 'artists') {
      refetchArtists();
    } else {
      refetchAlbums();
    }
  };

  useEffect(() => {
    setPageArtists(0);
    setPageAlbums(0);
  }, [debounceSearch, setPageArtists, setPageAlbums]);

  useEffect(() => {
    if (tab === 'artists') {
      setPageArtists(0);
    } else {
      setPageAlbums(0);
    }
  }, [tab, setPageArtists, setPageAlbums]);

  const totalArtists = artistsData?.artists?.total ?? 0;
  const totalArtistsPages = useMemo(() => Math.ceil(totalArtists / limit), [totalArtists]);

  const totalAlbums = albumsData?.albums?.total ?? 0;
  const totalAlbumsPages = useMemo(() => Math.ceil(totalAlbums / limit), [totalAlbums]);

  return (
    <div className="p-6">
      <div className="flex w-full justify-center gap-2 mb-6">
        <div className="w-full max-w-md">
          <Input
            type="text"
            placeholder={`Buscar ${tab === 'artists' ? 'artistas' : 'albuns'}`}
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Tabs
        defaultValue={tab}
        onValueChange={(value) => {
          setTab(value);
        }}
      >
        <div className="flex items-center gap-6 mb-6">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="artists">
              Artistas
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="albums">
              Albuns
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Artists */}
        <TabsContent value="artists">
          <h2 className="text-2xl font-bold pb-4">Artistas</h2>
          {artistsError && (
            <ErrorState
              message={artistsError?.message || 'Erro ao buscar artistas'}
              onRetry={handleRetry}
            />
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-between">
            {isArtistsFetching ? (
              <ArtistsAlbumsListSkeleton />
            ) : (
              artistsData?.artists?.items?.map((artist: Artist) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArtistsItem artist={artist} />
                </motion.div>
              ))
            )}
          </ul>

          {totalArtistsPages > 1 && (
            <PaginationComponent
              totalPages={totalArtistsPages}
              page={pageArtists}
              setPage={setPageArtists}
            />
          )}
        </TabsContent>

        {/* Tab Albums */}
        <TabsContent value="albums">
          <h2 className="text-2xl font-bold pb-4">Albuns</h2>
          {albumsError && (
            <ErrorState
              message={albumsError?.message || 'Erro ao buscar albuns'}
              onRetry={handleRetry}
            />
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-between">
            {isAlbumsFetching ? (
              <ArtistsAlbumsListSkeleton />
            ) : (
              albumsData?.albums?.items?.map((album: SimplifiedAlbum) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlbumsItem album={album} />
                </motion.div>
              ))
            )}
          </ul>

          {totalAlbumsPages > 1 && (
            <PaginationComponent
              totalPages={totalAlbumsPages}
              page={pageAlbums}
              setPage={setPageAlbums}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
