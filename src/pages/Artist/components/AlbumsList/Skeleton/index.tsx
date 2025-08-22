import { Skeleton } from "@/components/ui/skeleton"

export default function AlbumsListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-54 w-full rounded" />
      ))}
    </>
  )
}