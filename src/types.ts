export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
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
}

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
