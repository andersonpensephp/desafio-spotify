import { useEffect, useState } from "react";
import axios from "axios";

export function useAxios<T>(url: string, options?: any) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios<T>(url, options);
        setData(response.data);
      } catch (error: any) {
        setError(error.message || 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, error, loading };
}
