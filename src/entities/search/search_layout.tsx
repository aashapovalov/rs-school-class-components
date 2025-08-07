import { Outlet, useSearchParams } from 'react-router';

import { SearchForm, Spinner, ErrorMessage } from '..';

import genErrorMortyImg from '../../assets/general_error_morty.png';
import { useState } from 'react';

export function SearchLayout() {
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details') || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <div className="app bg-[var(--Background-light)] dark:bg-[var(--Background-dark)]">
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
                <ErrorMessage message={error as string} />
              </div>
            )
          ) : null}
          <section
            className={details ? 'results-section split' : 'results-section'}
          >
            <Outlet context={{ setLoading, setError }} />
          </section>
        </div>
      </div>
    </>
  );
}
