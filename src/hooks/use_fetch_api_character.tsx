import { useState, useEffect, useContext } from 'react';

import { SearchStateContext } from '../components';
import type { Character } from '../types/types';

export function useFetchApiCharacter(url: string) {
  const { setLoading, setError } = useContext(SearchStateContext);
  const [searchResults, setSearchResults] = useState<Character | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    setLoading(true);
    setError(null);
    async function fetchApi() {
      try {
        setError(null);
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          setSearchResults(null);
          setLoading(false);
          setError(data.error || 'Unknown error');
          return;
        }
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        } else {
          setError('Unknown error');
          setLoading(false);
        }
      }
    }
    fetchApi();
  }, [url]);
  return searchResults;
}
