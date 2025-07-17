export interface Character {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
}

export interface ResultsListProps {
  results: Character[];
}

export interface SearchFormProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (value: string) => void;
}

export interface ErrorMessageProps {
  message: string;
}

export interface CrashState {
  crashNow: boolean;
}
