import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { AboutButton, useLocalStorage, ThemeButton, useTheme } from '../';

import {
  deviceImg,
  deviceImgDark,
  appLogo,
  searchBtnDark,
  searchBtn,
} from '../../assets/index';

export default function SearchForm() {
  const [inputValue, setInputValue] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const imgDevice = theme === 'dark' ? deviceImgDark : deviceImg;

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
      <h1 className="character-search text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]">
        Character Search
      </h1>

      <div className="device-frame">
        <img src={imgDevice} alt="Device" className="device-no-bg" />
        <form onSubmit={handleSubmit}>
          <input
            className="search-input bg-[var(--Background-light)] dark:bg-[var(--Active-monitor-background-dark)] dark:text-[var(--Font-color-basic-dark)] placeholder-[var(--Font-color-secondary)] dark:placeholder-[var(--Font-color-basic-dark)]"
            value={inputValue as string}
            onChange={handleInputChange}
            placeholder="Search for a character..."
            type="text"
          />
          <button
            style={{
              backgroundImage: `url(${theme === 'dark' ? searchBtnDark : searchBtn})`,
            }}
            className="search-btn dark:scale-[1.05]"
            type="submit"
            aria-label="Search"
          />
        </form>
        <AboutButton />
        <ThemeButton />
      </div>
    </section>
  );
}
