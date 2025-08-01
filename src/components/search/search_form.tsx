import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { AboutButton, useLocalStorage, ThemeButton } from '../';

import deviceImg from '../../assets/search_device_desktop.png';
import appLogo from '../../assets/app_logo.png';

export default function SearchForm() {
  const [inputValue, setInputValue] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlName = searchParams.get('name');
    if (urlName !== null && urlName !== inputValue) {
      setInputValue(urlName);
    } else if (!urlName) {
      setSearchParams({ name: String(inputValue || ''), page: '1' });
    }
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = (inputValue as string).trim();
    setInputValue(trimmed);
    navigate(`/?name=${encodeURIComponent(trimmed)}&page=1`);
  }

  return (
    <section className="device">
      <img src={appLogo} className="logo" alt={'Rick and Morty logo'} />
      <h1 className="character-search">Character Search</h1>

      <div className="device-frame">
        <img src={deviceImg} alt="Device" className="device-no-bg" />
        <form onSubmit={handleSubmit}>
          <input
            className="search-input"
            value={inputValue as string}
            onChange={handleInputChange}
            placeholder="Search for a character..."
            type="text"
          />
          <button className="search-btn" type="submit" aria-label="Search" />
        </form>
        <AboutButton />
        <ThemeButton />
      </div>
    </section>
  );
}
