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

export type ErrorBoundaryProps = React.PropsWithChildren<unknown>;

export type SearchLayoutContext = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | false;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};
