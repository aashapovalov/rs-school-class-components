export interface Character {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
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
