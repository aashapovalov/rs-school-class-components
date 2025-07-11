import React, { Component } from 'react';
import SearchForm from './components/SearchForm';

interface Props {}

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
}

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  this.setState({ inputValue: e.target.value });
  console.log('Input value:', e.target.value);

}

  nameTransform (name: string) {
     return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '%20')
  };

  async handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  this.setState({ loading: true, error: null });
  console.log('Loading started');
  localStorage.setItem('searchQuery', this.state.inputValue);
  const searchTerm: string = this.state.inputValue;
  console.log('LS', localStorage.getItem('searchQuery'));
  try {
    if (searchTerm.trim() === '') {
      console.log('searchTerm is equal to 0')
      const responseAll = await fetch('https://rickandmortyapi.com/api/character');
      if (!responseAll.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await responseAll.json();
      console.log('Raw API data:', data); // 👈 Add this
      this.setState({ searchResults: data.results, loading: false });
      console.log('Search results:', this.state.searchResults);
    } else {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${this.nameTransform(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Raw API data:', data); // 👈 Add this
      this.setState({ searchResults: data.results, loading: false });
      console.log('Search results:', this.state.searchResults);
    }
  } catch (error: any) {
   this.setState(
  { error: error.message || 'Unknown error', loading: false },
  () => {
    console.log('Error:', this.state.error);
  }
);
  }
}


  render() {
    return (
      <div className="app">
        <SearchForm
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
      </div>
    );
  }
}
