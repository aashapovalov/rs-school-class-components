import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import type { Character, Info, SearchLayoutContext } from '@/shared/types';

export function useFetchApiList(url: string) {
  const { setLoading, setError } = useOutletContext<SearchLayoutContext>();
  const [searchResults, setSearchResults] = useState<{
    info: Info;
    results: Character[];
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchApi() {
      try {
        setError(null);
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setSearchResults(null);
          setError(data.error || 'Unknown error');
          return;
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setSearchResults(data);
      } catch (error) {
        if (error instanceof Error) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setError(error.message);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setError('Unknown error');
        }
      }
    }
    fetchApi();
  }, [url]);
  return searchResults;
}
