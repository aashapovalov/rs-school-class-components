import { CrashButton } from './';

import type { SearchFormProps } from './types';

import deviceImg from '../assets/search_device_desktop_no_background.png';
import appLogo from '../assets/app_logo.png';

export default function SearchForm(props: SearchFormProps) {
  return (
    <section className="device">
      <img src={appLogo} className="logo" />
      <h1 className="character-search">Character Search</h1>

      <div className="device-frame">
        <img src={deviceImg} alt="Device" className="device-no-bg" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSearchSubmit(props.inputValue);
          }}
        >
          <input
            className="search-input"
            value={props.inputValue}
            onChange={props.onInputChange}
            placeholder="Search for a character..."
            type="text"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              props.onSearchSubmit(props.inputValue);
            }}
            className="search-btn"
            type="submit"
            aria-label="Search"
          />
        </form>
        <CrashButton />
      </div>
    </section>
  );
}
