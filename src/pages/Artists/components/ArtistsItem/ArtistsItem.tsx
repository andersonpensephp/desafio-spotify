import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import type { Artist } from '@/types/spotify';
import { useTranslation } from 'react-i18next';

interface ArtistsItemProps {
  artist: Artist;
}

export const ArtistsItem = memo(({ artist }: ArtistsItemProps) => {
  const navigate = useNavigate();
  const followersFormatted = artist?.followers?.total
    ? artist.followers.total.toLocaleString('pt-BR')
    : '0';
  const { t } = useTranslation();

  return (
    <li>
      <Card
        className="w-full h-64 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => {
          navigate(
            `/artist/${artist.id}`,
            {
              state: {
                from: location.pathname + location.search,
                breadcrumbLabel: 'artists'
              }
            }
          );
        }}
      >
        <CardContent className="flex flex-col items-center p-4 gap-2">
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{artist.name}</h3>
          <p className="text-gray-500">{followersFormatted} {t('followers')}</p>
        </CardContent>
      </Card>
    </li>
  );
});
