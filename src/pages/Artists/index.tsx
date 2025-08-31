import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { PaginationComponent } from '@/components/common/Pagination/Pagination';
import EmptySearchAlert from '@/components/common/EmptySearchAlert/EmptySearchAlert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArtistsItem } from './components/ArtistsItem/ArtistsItem';
import { AlbumsItem } from './components/AlbumsItem/AlbumsItem';
import type { Artist, SimplifiedAlbum } from '@/types/spotify';
import ArtistsAlbumsListSkeleton from './Skeleton/ArtistsAlbumsListSkeleton';
import { SearchContext } from '../../context/SearchContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useArtistsQuery } from '../../hooks/spotify/useArtistsQuery';
import { useAlbumsQuery } from '../../hooks/spotify/useAlbumsQuery';

const limit = import.meta.env.VITE_LIMIT_PER_PAGE;

const DEBOUNCE_DELAY = 600;

export default function Artists() {
  const { search, setSearch, tab, setTab, pageArtists, setPageArtists, pageAlbums, setPageAlbums } =
    useContext(SearchContext);
  const debounceSearch = useDebounce(search, DEBOUNCE_DELAY);
  const { t } = useTranslation();

  // Query de artistas
  const {
    data: artistsData,
    isFetching: isArtistsFetching,
    error: artistsError,
    refetch: refetchArtists
  } = useArtistsQuery({
    debounceSearch,
    pageArtists,
    limit,
  });

  // Query de albuns
  const {
    data: albumsData,
    isFetching: isAlbumsFetching,
    error: albumsError,
    refetch: refetchAlbums
  } = useAlbumsQuery({
    debounceSearch,
    pageAlbums,
    limit,
    enabled: tab === 'albums',
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
    if (!debounceSearch) {
      setPageArtists(0);
      setPageAlbums(0);

      refetchArtists();
      refetchAlbums();
    }
  }, [debounceSearch, setPageArtists, setPageAlbums, refetchArtists, refetchAlbums]);

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
        <div className="w-full max-w-md relative">
          <MagnifyingGlassIcon
            size={20}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder={`${t('search')} ${tab === 'artists' ? t('artist') : t('albums')}`}
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {artistsData?.artists?.items?.length === 0 ? (
        <div className="max-w-md mx-auto pt-6">
          <EmptySearchAlert
            title={t('noSearchTitle')}
            message={t('noSearchMessage')}
          />
        </div>
      ) : (
        <Tabs
          defaultValue={tab}
          onValueChange={(value) => {
            setTab(value);
          }}
        >
          <div className="flex items-center gap-6 mb-6">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="artists">
                {t('artists')}
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="albums">
                {t('albums')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Artists */}
          <TabsContent value="artists">
            <h2 className="text-2xl font-bold pb-4">{t('artists')}</h2>
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
            <h2 className="text-2xl font-bold pb-4">{t('albums')}</h2>
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
      )}
    </div>
  );
}
