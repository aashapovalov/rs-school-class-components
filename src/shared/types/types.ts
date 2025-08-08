import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type ResultsListProps = {
  info: Info;
  results: Character[];
};

export type Info = {
  pages: number;
  count: number;
  next: string | null;
  prev: string | null;
};

export type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
export interface SearchFormProps {
  inputValue: string;
  onSearchSubmit: (value: string) => void;
}

export interface CrashState {
  crashNow: boolean;
}

export type SearchStateContextType = {
  loading: boolean;
  error: string | null;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export type ErrorBoundaryProps = PropsWithChildren<unknown>;

export type SearchLayoutContext = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | false;
  setError: Dispatch<SetStateAction<string | null>>;
};
