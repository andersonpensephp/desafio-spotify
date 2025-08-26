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
