import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { SearchStateContextType } from './types';

export const SearchStateContext = createContext<SearchStateContextType>({
  loading: false,
  error: null,
  setLoading: () => {},
  setError: () => {},
});

export default function SearchStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <SearchStateContext.Provider
      value={{ loading, error, setLoading, setError }}
    >
      {children}
    </SearchStateContext.Provider>
  );
}
