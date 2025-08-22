import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

export const AlbumsItem = memo(({ album }: { album: any }) => {
  const navigate = useNavigate();
  return (
    <li>
      <Card
        className="w-full h-64 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => {
          navigate(`/album/${album.id}`);
        }}
      >
        <CardContent className="flex flex-col items-center p-4 gap-2">
          <img
            src={album.images[0]?.url}
            alt={album.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{album.name}</h3>
        </CardContent>
      </Card>
    </li>
  );
});
