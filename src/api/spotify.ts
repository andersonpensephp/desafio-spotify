import axios from "axios";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const getArtists = async <T>(query: string): Promise<T> => {
  const response = await api.get("/search", {
    params: {
      q: query,
      type: "artist",
      limit: 20,
    },
  });

  return response.data as T;
}

export const getArtist = async <T>(id: string): Promise<T> => {
  const response = await api.get(`/artists/${id}`);
  return response.data as T;
}

export const getArtistTopTracks = async <T>(id: string, market: string): Promise<T> => {
  const response = await api.get(`/artists/${id}/top-tracks`, {
    params: {
      market,
    },
  });
  return response.data as T;
}

export const getArtistAlbums =
  async <T>(id: string, limit: number, offset = 0): Promise<T> => {
    const response = await api.get(`/artists/${id}/albums`, {
      params: {
        limit,
        offset,
      },
    });
    return response.data as T;
  }
