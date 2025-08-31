import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { type Track, TracksListCard } from '@/components/common/TracksListCard/TracksListCard';
import { SearchContext } from '@/context/SearchContext';
import type { Album, SimplifiedArtist, SimplifiedTrack } from '@/types/spotify';
import { formatDate } from '@/utils/date';

import AlbumSkeleton from './Skeleton/AlbumSkeleton';
import TracksListSkeleton from './Skeleton/TracksListSkeleton';
import { useTranslation } from 'react-i18next';
import { useAlbumTracksQuery } from '@/hooks/spotify/useAlbumTracksQuery';
import { useAlbumByIdQuery } from '@/hooks/spotify/useAlbumByIdQuery';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const { search, pageAlbums } = useContext(SearchContext);
  const { t } = useTranslation();

  const location = useLocation();

  const previousPath = location.state?.from || '/artists';
  const breadcrumbLabel = location.state?.breadcrumbLabel || 'Voltar';

  const {
    data: albumData,
    isLoading: albumLoading,
    error: albumError,
    refetch: refetchAlbum
  } = useAlbumByIdQuery({ id: id!, search, pageAlbums });

  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
    refetch: refetchTracks
  } = useAlbumTracksQuery({ id: id!, limit: 50, offset: 0 });

  const tracks = tracksData?.items
    .filter((track: SimplifiedTrack) => track.track_number !== null)
    .map((track: SimplifiedTrack) => ({
      id: track.id,
      name: track.name,
      albumImage: albumData?.images?.[0]?.url,
      artists: track.artists,
      duration_ms: track.duration_ms,
      urlSpotify: track.external_urls?.spotify,
    })) as Track[];
  console.log(albumData);
  return (
    <div className="p-6">
      <Breadcrumbs
        items={[
          { label: t(breadcrumbLabel), path: previousPath },
          { label: albumData?.name ?? '' }
        ]}
      />

      {albumLoading ? (
        <AlbumSkeleton />
      ) : albumError ? (
        <ErrorState
          message={albumError?.message || `${t('erros.errorAlbum')}`}
          onRetry={() => {
            refetchAlbum();
          }}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-3">{albumData?.name}</h1>
          <div
            className="aspect-[16/9] bg-cover bg-center p-0 rounded-md mb-6 w-full h-96"
            style={{
              backgroundImage: `url(${albumData?.images[0].url})`,
            }}
          />
          <div>
            <h2 className="text-xl font-bold mb-2">
              {t(albumData?.artists && albumData?.artists.length > 1
                ? 'artists'
                : 'artist')}: {albumData?.artists?.map((artist: SimplifiedArtist) => artist.name).join(' | ')}
            </h2>
            <p className="text-gray-500">
              {t('releaseDate')}: {formatDate(albumData?.release_date ?? '', 'dd/MM/yyyy')}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4"> {albumData?.total_tracks} {t('tracks')}</h2>
          </div>
        </>
      )}

      <div className="mt-6">
        {tracksLoading ? (
          <TracksListSkeleton />
        ) : tracksError ? (
          <ErrorState
            message={tracksError?.message || `${t('erros.errorTracks')}`}
            onRetry={() => refetchTracks()}
          />
        ) : (
          <TracksListCard tracks={tracks} />
        )}
      </div>
    </div>
  );
}
