export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
  retry: 2,
  retryDelay: 1000,
  throwOnError: true,
}

