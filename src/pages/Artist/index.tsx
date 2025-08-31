import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { TracksListCard } from '@/components/common/TracksListCard/TracksListCard';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchContext } from '@/context/SearchContext';
import type { Artist, Track } from '@/types/spotify';

import ArtistSkeleton from './Skeleton/ArtistSkeleton';
import AlbumsList from './components/AlbumsList/AlbumsList';
import { useTranslation } from 'react-i18next';
import { useArtistQuery } from '@/hooks/spotify/useArtistQuery';
import { useArtistTopTracksQuery } from '@/hooks/spotify/useArtistTopTracksQuery';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export default function Artist() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState('albums');
  const { search, pageArtists } = useContext(SearchContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const previousPath = location.state?.from || '/artists';
  const breadcrumbLabel = location.state?.breadcrumbLabel || t('back');

  const isTopTracksTab = tab === 'top-tracks';

  const {
    data: artist,
    isLoading: artistLoading,
    error: artistError,
    refetch: refetchArtist
  } = useArtistQuery({ id: id!, search, pageArtists });

  const {
    data: tracks,
    error: tracksError,
    refetch: refetchTracks
  } = useArtistTopTracksQuery({ id: id!, country: 'BR', enabled: isTopTracksTab });

  const handleRetry = useCallback(() => {
    refetchArtist();
    refetchTracks();
  }, [refetchArtist, refetchTracks]);

  const tracksList = tracks?.tracks.map((track: Track) => ({
    id: track.id,
    name: track.name,
    albumName: track.album.name,
    albumImage: track.album.images[0].url,
    artists: track.artists,
    duration_ms: track.duration_ms,
    urlSpotify: track.external_urls?.spotify,
  }));

  return (
    <div className="p-6">
      <Breadcrumbs
        items={[
          { label: t(breadcrumbLabel), path: previousPath },
          { label: artist?.name ?? '' }
        ]}
      />

      {artistLoading ? (
        <ArtistSkeleton />
      ) : artistError || tracksError ? (
        <ErrorState
          message={artistError?.message || tracksError?.message || 'Erro ao buscar artista'}
          onRetry={handleRetry}
        />
      ) : (
        <>
          <div className="flex items-center gap-6 mb-6">
            <img
              src={artist?.images[0].url}
              alt={artist?.name}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{artist?.name}</h1>
              <p className="text-gray-500">
                {artist?.followers?.total?.toLocaleString('pt-BR')} {t('followers')}
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${artist?.popularity}%` }}
                />
              </div>
            </div>
          </div>
          <Tabs
            defaultValue={tab}
            onValueChange={(value) => {
              setTab(value);
              navigate(`/artist/${id}`);
            }}
          >
            <div className="flex items-center gap-6 mb-6">
              <TabsList>
                <TabsTrigger className="cursor-pointer" value="albums">{t('albums')}</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="top-tracks">{t('topTracks')}</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="albums">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AlbumsList />
              </motion.div>
            </TabsContent>
            <TabsContent value="top-tracks">
              <TracksListCard tracks={tracksList ?? []} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
