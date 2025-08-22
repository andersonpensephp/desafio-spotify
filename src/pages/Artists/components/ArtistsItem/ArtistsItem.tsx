import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

export const ArtistsItem = memo(({ artist }: { artist: any }) => {
  const navigate = useNavigate();
  return (
    <li>
      <Card
        className="w-full h-64 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => {
          navigate(`/artist/${artist.id}`);
        }}
      >
        <CardContent className="flex flex-col items-center p-4 gap-2">
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{artist.name}</h3>
        </CardContent>
      </Card>
    </li>
  );
});
