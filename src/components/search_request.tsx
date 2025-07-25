import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { Character, Info } from './types';
import { ResultsList, SearchStateContext } from './';

export default function SearchRequst() {
  const [searchResults, setSearchResults] = useState<{
    info: Info;
    results: Character[];
  } | null>(null);
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get('name') || '';
  const searchPage = searchParams.get('page') || 1;
  const { setLoading, setError } = useContext(SearchStateContext);
  useEffect(() => {
    const urlBase: string = 'https://rickandmortyapi.com/api/character';
    async function handleEventInput() {
      try {
        setError(null);
        const urlName: string = `${urlBase}/?name=${searchName}&page=${searchPage}`;
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
    handleEventInput();
  }, [searchName, setError, setLoading]);

  if (searchResults) {
    return (
      <ResultsList info={searchResults.info} results={searchResults.results} />
    );
  }

  return null;
}
