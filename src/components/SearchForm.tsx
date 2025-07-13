import React, { Component } from 'react';
import deviceImg from '../assets/search_device_desktop_no_background.png';
import appLogo from '../assets/app_logo.png';
import CrashButton from './CrashButton';


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
  <img src={appLogo} className="logo" />
  <h1 className="character-search">Character Search</h1>

  <div className="device-frame">
    <img src={deviceImg} alt="Device" className="device-no-bg" />
    <form onSubmit={this.props.onSearchSubmit}>
      <input
        className="search-input"
        value={this.props.inputValue}
        onChange={this.props.onInputChange}
        placeholder="Search for a character..."
        type="text"
      />
      <button className="search-btn" type="submit" />
    </form>
    <CrashButton/>
  </div>
</section>

      </>
    );
  }
}
