import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';
import genErrorMortyImg from './assets/general_error_morty.png';

type Props = Record<string, never>;

interface Character {
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

interface State {
  inputValue: string;
  searchResults: Character[];
  loading: boolean;
  error: string | null;
}
export default class App extends Component {
  state: State = {
    inputValue: '',
    searchResults: [],
    loading: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nameTransform = this.nameTransform.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    console.log('App constructor');
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
    console.log('Input value:', e.target.value);
  }

  nameTransform(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, '%20');
  }

  async handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    console.log('Loading started');
    localStorage.setItem('searchQuery', this.state.inputValue);
    const searchTerm: string = this.state.inputValue;
    console.log('LS', localStorage.getItem('searchQuery'));
    try {
      if (searchTerm.trim() === '') {
        console.log('searchTerm is equal to 0');
        const responseAll = await fetch(
          'https://rickandmortyapi.com/api/character'
        );
        if (!responseAll.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await responseAll.json();
        console.log('Raw API data:', data);
        this.setState({ searchResults: data.results, loading: false });
        console.log('Search results:', this.state.searchResults);
      } else {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${this.nameTransform(searchTerm)}`
        );
        const data = await response.json();
        if (!response.ok) {
          this.setState({
            searchResults: [],
            loading: false,
            error: data.error || 'Unknown error',
          });
          return;
        }
        console.log('Raw API data:', data);
        this.setState({ searchResults: data.results, loading: false });
        console.log('Search results:', this.state.searchResults);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  }

  componentDidMount() {
    console.log('App component Did Mount');
    const inputValue = localStorage.getItem('searchQuery') || '';
    this.setState({ inputValue }, () => {
      this.handleSearchSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    });
  }

  render() {
    console.log('Rendering SearchForm');
    const { loading } = this.state;
    return (
      <div className="app">
        {loading ? <Spinner /> : null}
        <div className={this.state.loading ? 'blurring' : ''}>
          <SearchForm
            inputValue={this.state.inputValue}
            onInputChange={this.handleInputChange}
            onSearchSubmit={this.handleSearchSubmit}
          />
        </div>
        {this.state.error ? (
          this.state.error === 'There is nothing here' ? (
            <ErrorMessage message={this.state.error} />
          ) : (
            <div className="error-block">
              <img
                src={genErrorMortyImg}
                alt="Morty panic"
                className="general-error-morty"
              />
              <ErrorMessage message={this.state.error} />
            </div>
          )
        ) : null}
        <ResultsList results={this.state.searchResults} />
      </div>
    );
  }
}
