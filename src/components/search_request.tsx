import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { Character, Info } from './types';
import { ResultsList, SearchStateContext } from './';

export default function SearchRequst() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const { setLoading, setError } = useContext(SearchStateContext);
  const [searchResults, setSearchResults] = useState<{
    info: Info;
    results: Character[];
  } | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      const urlBase: string = 'https://rickandmortyapi.com/api/character';
      setLoading(true);
      setError(null);
      try {
        setError(null);
        const urlName: string = `${urlBase}/?name=${encodeURIComponent(name)}&page=${page}`;
        const response = await fetch(urlName);
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
    fetchCharacters();
  }, [name, page, setError, setLoading]);

  if (searchResults) {
    return (
      <ResultsList info={searchResults.info} results={searchResults.results} />
    );
  }

  return null;
}
