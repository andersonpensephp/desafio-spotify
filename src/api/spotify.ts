import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_SPOTIFY_API;
const limitPerPage = import.meta.env.VITE_LIMIT_PER_PAGE;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const getArtists = async <T>(
  query: string,
  limit = limitPerPage,
  offset = 0
): Promise<T> => {
  const response = await api.get('/search', {
    params: {
      q: query,
      type: 'artist',
      limit,
      offset,
    },
  });

  return response.data as T;
};

export const getArtist = async <T>(id: string): Promise<T> => {
  const response = await api.get(`/artists/${id}`);
  return response.data as T;
};

export const getArtistTopTracks = async <T>(id: string, market: string): Promise<T> => {
  const response = await api.get(`/artists/${id}/top-tracks`, {
    params: {
      market,
    },
  });
  return response.data as T;
};

export const getArtistAlbums = async <T>(id: string, limit: number, offset = 0): Promise<T> => {
  const response = await api.get(`/artists/${id}/albums`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data as T;
};

export const getAlbumTracks = async <T>(id: string, limit: number, offset = 0): Promise<T> => {
  const response = await api.get(`/albums/${id}/tracks`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data as T;
};

export const getAlbumById = async <T>(id: string): Promise<T> => {
  const response = await api.get(`/albums/${id}`);
  return response.data as T;
};

export const getArtistAlbumsByQuery = async <T>(
  query: string,
  limit = limitPerPage,
  offset = 0
): Promise<T> => {
  const response = await api.get(`/search`, {
    params: {
      q: query,
      type: 'album',
      limit,
      offset,
    },
  });
  return response.data as T;
};
