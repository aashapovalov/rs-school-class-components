import { Component } from 'react';
import { CrashButton } from './';

import type { SearchFormProps } from './types';

import deviceImg from '../assets/search_device_desktop_no_background.png';
import appLogo from '../assets/app_logo.png';

export default class SearchForm extends Component<SearchFormProps> {
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
            <CrashButton />
          </div>
        </section>
      </>
    );
  }
}
