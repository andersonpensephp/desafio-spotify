import { TimerIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { millisToMinutesAndSeconds } from '@/utils/timers';

export interface Track {
  id: string;
  name: string;
  albumName: string;
  albumImage?: string;
  artists: {
    name: string;
  }[];
  duration_ms: number;
}

interface TracksListCardProps {
  tracks: Track[];
}

export const TracksListCard = ({ tracks }: TracksListCardProps) => {
  return (
    <div className="grid gap-4">
      {tracks?.map((track: Track) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center gap-4 p-4">
              {track.albumImage && (
                <img
                  src={track.albumImage}
                  alt={track.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}

              <div className="flex flex-col">
                <p>Album: {track.albumName}</p>
                <h2 className="text-lg font-semibold">{track.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {track.artists?.map((artist) => artist.name).join(', ')}
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-400 flex items-center gap-2">
                <TimerIcon size={20} weight="duotone" />
                {millisToMinutesAndSeconds(track.duration_ms)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
