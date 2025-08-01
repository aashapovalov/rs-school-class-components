import { useState, useEffect } from 'react';

import type { Character, Info, SearchLayoutContext } from '../types/types';
import { useOutletContext } from 'react-router';

export function useFetchApiList(url: string) {
  const { setLoading, setError } = useOutletContext<SearchLayoutContext>();
  const [searchResults, setSearchResults] = useState<{
    info: Info;
    results: Character[];
  } | null>(null);

  useEffect(() => {
    console.log('Calling setLoading(true) inside fetch');
    setLoading(true);
    console.log('setLoading called with', true);
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
        console.log('setLoading called with', false);
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
