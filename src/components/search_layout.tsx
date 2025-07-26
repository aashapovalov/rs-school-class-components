import { Outlet, useSearchParams } from 'react-router';
import { useContext } from 'react';

import { SearchForm, Spinner, ErrorMessage, SearchStateContext } from './';

import genErrorMortyImg from '../assets/general_error_morty.png';

export default function SearchLayout() {
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details') || '';
  const { loading, error } = useContext(SearchStateContext);
  return (
    <>
      <div className="app">
        {loading ? <Spinner /> : null}
        <div className={loading ? 'blurring' : ''}>
          <SearchForm />
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
          <section
            className={details ? 'results-section split' : 'results-section'}
          >
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}
