import { useEffect, useState } from 'react';
import { SearchForm, ResultsList, Spinner, ErrorMessage } from './components';

import './app.css';
import genErrorMortyImg from './assets/general_error_morty.png';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedQuary = localStorage.getItem('searchQuery') || '';
    setInputValue(savedQuary);
    handleSearchSubmit(savedQuary);
  }, []);

  function nameTransform(name: string) {
    return name.toLowerCase().replace(/\s+/g, '%20');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function handleSearchSubmit(input: string) {
    localStorage.removeItem('searchQuery');
    localStorage.setItem('searchQuery', input.trim());

    const urlBase: string = 'https://rickandmortyapi.com/api/character';
    try {
      if (input.trim() === '') {
        const responseAll = await fetch(urlBase);
        if (!responseAll.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await responseAll.json();
        setSearchResults(data.results);
        setLoading(false);
      } else {
        const urlName: string = `${urlBase}/?name=${nameTransform(input.trim())}`;
        const response = await fetch(urlName);
        const data = await response.json();
        if (!response.ok) {
          setSearchResults([]);
          setLoading(false);
          setError(data.error || 'Unknown error');
          return;
        }
        setSearchResults(data.results);
        setLoading(false);
      }
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

  return (
    <div className="app">
      {loading ? <Spinner /> : null}
      <div className={loading ? 'blurring' : ''}>
        <SearchForm
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>
      {error ? (
        error === 'There is nothing here' ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="error-block">
            <img
              src={genErrorMortyImg}
              alt="Morty panic"
              className="general-error-morty"
            />
            <ErrorMessage message={error} />
          </div>
        )
      ) : null}
      <ResultsList results={searchResults} />
    </div>
  );
}
