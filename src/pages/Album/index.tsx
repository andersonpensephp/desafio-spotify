import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getAlbumById, getAlbumTracks } from '@/api/spotify';
import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import { type Track, TracksListCard } from '@/components/common/TracksListCard/TracksListCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SearchContext } from '@/context/SearchContext';
import type { Album, SearchResponse, SimplifiedAlbum, SimplifiedTrack } from '@/types/spotify';
import { formatDate } from '@/utils/date';

import AlbumSkeleton from './Skeleton/AlbumSkeleton';
import TracksListSkeleton from './Skeleton/TracksListSkeleton';
import { useTranslation } from 'react-i18next';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const { search, pageAlbums } = useContext(SearchContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    data: albumData,
    isLoading: albumLoading,
    error: albumError,
    refetch: refetchAlbum,
  } = useQuery({
    queryKey: ['albums', id],
    queryFn: () => getAlbumById(id!),
    initialData: () => {
      const cachedAlbums = queryClient.getQueryData<SearchResponse<SimplifiedAlbum>>([
        'albums',
        search,
        pageAlbums,
      ]);
      return cachedAlbums?.albums?.items.find((a) => a.id === id) || undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
    refetch: refetchTracks,
  } = useQuery({
    queryKey: ['tracks', id],
    queryFn: () => getAlbumTracks(id!, 50),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    throwOnError: true,
  });

  const tracks = tracksData?.items
    .filter((track: SimplifiedTrack) => track.track_number !== null)
    .map((track: SimplifiedTrack) => ({
      id: track.id,
      name: track.name,
      albumName: albumData?.name,
      albumImage: albumData?.images?.[0]?.url,
      artists: track.artists,
      duration_ms: track.duration_ms,
    })) as Track[];

  return (
    <div className="p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="cursor-pointer" onClick={() => navigate('/artists')}>
              {t('artists')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{albumData?.name ?? ''}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
          <div
            className="aspect-[16/9] bg-cover bg-center p-0 rounded-md mb-6 w-full h-96"
            style={{
              backgroundImage: `url(${albumData?.images[0].url})`,
            }}
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{albumData?.name}</h1>
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
