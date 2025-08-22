import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList } from '@/components/ui/tabs';

export default function ArtistSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      {/* Header do artista */}
      <div className="flex items-center gap-6 mb-6">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-48 h-8" /> {/* Nome */}
          <Skeleton className="w-32 h-4" /> {/* Seguidores */}
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <Skeleton className="h-2 rounded-full w-1/2" /> {/* Popularidade */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
        <Tabs>
          <TabsList>
            <Skeleton className="w-24 h-8 rounded-full" />
            <Skeleton className="w-32 h-8 rounded-full" />
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
