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
  episode: string[]; // array of episode URLs
  url: string;
  created: string; // ISO date string
};

export interface AppState {
  inputValue: string;
  searchResults: Character[];
  loading: boolean;
  error: string | null;
}

export type AppProps = Record<string, never>;

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export type ErrorBoundaryProps = React.PropsWithChildren<unknown>;
