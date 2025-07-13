import React, { Component } from 'react';
import deviceImg from '../assets/search_device_desktop_no_background.png';
import appLogo from '../assets/app_logo.png';


interface Props {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default class SearchForm extends Component<Props> {
  render() {
    return (
      <>
        <section className="device">
        <img src={appLogo} alt='Rick and Morty logo' className='logo' />
        <h1 className='character-search'>Character Search</h1>
        <img src={deviceImg} alt="Device background" className="device-bg" />
        <form className="search-form" onSubmit={this.props.onSearchSubmit}>
          <input
            type="text"
            className="search-input"
            value={this.props.inputValue}
            onChange={this.props.onInputChange}
            placeholder="Search for a character..."
          />
          <button type="submit" className="search-btn" />
        </form>
      </section>
      </>
    );
  }
}
