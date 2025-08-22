import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArtistsAlbumsListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Card className="w-full h-64 shadow-md animate-pulse">
            <CardContent className="flex flex-col items-center p-4 gap-2">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="w-32 h-6 rounded" />
            </CardContent>
          </Card>
        </li>
      ))}
    </>
  );
}
