import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TracksListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Card className="hover:shadow-lg transition-shadow" key={i}>
          <CardContent className="flex items-center gap-4 p-4">
            {/* Skeleton da imagem */}
            <Skeleton className="w-16 h-16 rounded-md" />

            {/* Skeleton do texto */}
            <div className="flex flex-col flex-1 gap-2">
              <Skeleton className="w-32 h-4 rounded" /> {/* Album  */}
              <Skeleton className="w-48 h-5 rounded" /> {/* Track */}
              <Skeleton className="w-40 h-3 rounded" /> {/* Artists */}
            </div>

            {/* Skeleton do tempo */}
            <Skeleton className="ml-auto w-12 h-4 rounded" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
