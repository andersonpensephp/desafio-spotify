import { Skeleton } from "@/components/ui/skeleton"

export default function AlbumSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Banner da capa */}
      <Skeleton className="aspect-[16/9] w-full h-96 rounded-md mb-6" />

      {/* Informações do álbum */}
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-8 rounded" /> {/* Nome do álbum */}
        <Skeleton className="w-32 h-4 rounded" />   {/* Data de lançamento */}
        <Skeleton className="w-24 h-4 rounded" />   {/* Número de faixas */}
      </div>
    </div>
  )
}
