import React, { Component } from 'react';

interface Props {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default class SearchForm extends Component<Props> {
  render() {
    return (
      <>
        <section className="search-section">
          <form className="search-form" onSubmit={this.props.onSearchSubmit}>
            <input
              type="text"
              className="search-input"
              value={this.props.inputValue}
              onChange={this.props.onInputChange}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </section>
      </>
    );
  }
}
