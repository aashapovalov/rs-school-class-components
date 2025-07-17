import { Component } from 'react';
import { SearchForm, ResultsList, Spinner, ErrorMessage } from './components';
import type { AppState, AppProps } from './types';

import './app.css';
import genErrorMortyImg from './assets/general_error_morty.png';

export default class App extends Component {
  state: AppState = {
    inputValue: '',
    searchResults: [],
    loading: false,
    error: null,
  };

  constructor(props: AppProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nameTransform = this.nameTransform.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  nameTransform(name: string) {
    return name.toLowerCase().replace(/\s+/g, '%20');
  }

  async handleSearchSubmit(input: string) {
    this.setState({ loading: true, error: null });
    localStorage.removeItem('searchQuery');
    localStorage.setItem('searchQuery', input.trim());
    const searchTerm: string = input;
    const urlBase: string = 'https://rickandmortyapi.com/api/character';
    try {
      if (searchTerm.trim() === '') {
        const responseAll = await fetch(urlBase);
        if (!responseAll.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await responseAll.json();
        this.setState({ searchResults: data.results, loading: false });
      } else {
        const urlName: string = `${urlBase}/?name=${this.nameTransform(searchTerm.trim())}`;
        const response = await fetch(urlName);
        const data = await response.json();
        if (!response.ok) {
          this.setState({
            searchResults: [],
            loading: false,
            error: data.error || 'Unknown error',
          });
          return;
        }
        this.setState({ searchResults: data.results, loading: false });
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
      this.handleSearchSubmit(inputValue);
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
