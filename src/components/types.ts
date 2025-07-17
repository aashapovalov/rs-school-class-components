export interface Character {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
}

export interface ResultsListProps {
  results: Character[];
}

export interface SearchFormProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ErrorMessageProps {
  message: string;
}

export interface CrashState {
  crashNow: boolean;
}
