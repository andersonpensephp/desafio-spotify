import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtistAlbums } from "@/api/spotify";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from "@/utils/date";

const limit = 20;

export default function AlbumsList() {
  const [page, setPage] = useState(0);

  const { id } = useParams();

  const { data: albums, isLoading, error } = useQuery({
    queryKey: ["albums", id, limit, page],
    queryFn: () => getArtistAlbums<any>(id!, limit, page * limit),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar albuns</p>;

  const totalAlbums = albums?.total ?? 0;
  const totalPages = Math.ceil(totalAlbums / limit);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums?.items.map((album: any) => (
          <Card
            key={album.id}
            className="shadow-md hover:shadow-xl transition-shadow pt-0 pl-0 pr-0"
          >
            <CardHeader className="p-0">
              <img
                src={album.images[0].url}
                alt={album.name}
                className="w-full h-54 object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{album.name}</CardTitle>
              <CardDescription>{formatDate(album.release_date, "dd/MM/yyyy")}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((page - 1) % totalPages)}
                  isActive={page === 0}
                />
              </PaginationItem>
              {Array.from({ length: totalPages })
                .slice(page, page + 5)
                .map((_, index) => {
                  const pageIndex = page + index;
                  return (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink
                        onClick={() => setPage(pageIndex)}
                        isActive={page === pageIndex}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((page + 1) % totalPages)}
                  isActive={page === totalPages - 1}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}