import axios from 'axios';

import type {
  Album,
  AlbumTracksResponse,
  Artist,
  ArtistAlbumsResponse,
  ArtistTopTracksResponse,
  SearchResponse,
  SimplifiedAlbum,
} from '../types/spotify';

const apiBaseUrl = import.meta.env.VITE_SPOTIFY_API;
const limitPerPage = import.meta.env.VITE_LIMIT_PER_PAGE;
const AUTH_URL = import.meta.env.VITE_SPOTIFY_AUTHORIZED;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (error: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

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

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
    }
    const refreshToken = localStorage.getItem('spotify_refresh');
    isRefreshing = true;

    if (!refreshToken) {
      isRefreshing = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('spotify_refresh');
      window.location.href = '/';

      return Promise.reject(error);
    }

    try {
      const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      const { data } = await axios.post(AUTH_URL + '/api/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      if (!data) {
        throw new Error(data.error.message || 'Nenhum token encontrado');
      }

      const newAccessToken = data.access_token;

      localStorage.setItem('access_token', newAccessToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch {
      processQueue(error, null);

      localStorage.removeItem('access_token');
      localStorage.removeItem('spotify_refresh');
      window.location.href = '/';

    } finally {
      isRefreshing = false;
    }

    return Promise.reject(error);
  }
);

export const getArtists = async (
  query: string,
  limit = limitPerPage,
  offset = 0
): Promise<SearchResponse<Artist>> => {
  const response = await api.get('/search', {
    params: {
      q: query,
      type: 'artist',
      limit,
      offset,
    },
  });

  return response.data;
};

export const getArtist = async (id: string): Promise<Artist> => {
  const response = await api.get(`/artists/${id}`);
  return response.data;
};

export const getArtistTopTracks = async (
  id: string,
  market: string
): Promise<ArtistTopTracksResponse> => {
  const response = await api.get(`/artists/${id}/top-tracks`, {
    params: {
      market,
    },
  });
  return response.data;
};

export const getArtistAlbums = async (
  id: string,
  limit: number,
  offset = 0
): Promise<ArtistAlbumsResponse> => {
  const response = await api.get(`/artists/${id}/albums`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getAlbumTracks = async (
  id: string,
  limit?: number,
  offset = 0
): Promise<AlbumTracksResponse> => {
  const response = await api.get(`/albums/${id}/tracks`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getAlbumById = async (id: string): Promise<Album> => {
  const response = await api.get(`/albums/${id}`);
  return response.data;
};

export const getArtistAlbumsByQuery = async (
  query: string,
  limit = limitPerPage,
  offset = 0
): Promise<SearchResponse<SimplifiedAlbum>> => {
  const response = await api.get(`/search`, {
    params: {
      q: query,
      type: 'album',
      limit,
      offset,
    },
  });
  return response.data;
};
