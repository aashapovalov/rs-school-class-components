import { CrashButton, useLocalStorage } from './';

import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';

import deviceImg from '../assets/search_device_desktop_no_background.png';
import appLogo from '../assets/app_logo.png';

export default function SearchForm() {
  const [inputValue, setInputValue] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get('page') || 1;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (!searchParams.get('name')) {
      navigate(`/search?name=${encodeURIComponent(inputValue)}`);
    }
  }, [inputValue, navigate, searchParams]);

  useEffect(() => {
    const nameFromUrl = searchParams.get('name') || '';
    if (nameFromUrl !== inputValue) {
      setInputValue(nameFromUrl);
    }
  }, []);

  return (
    <section className="device">
      <img src={appLogo} className="logo" />
      <h1 className="character-search">Character Search</h1>

      <div className="device-frame">
        <img src={deviceImg} alt="Device" className="device-no-bg" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              `/search?name=${encodeURIComponent(inputValue.trim())}&page=${searchPage}`
            );
          }}
        >
          <input
            className="search-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a character..."
            type="text"
          />
          <button className="search-btn" type="submit" aria-label="Search" />
        </form>
        <CrashButton />
      </div>
    </section>
  );
}
