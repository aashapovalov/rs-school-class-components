import { useTheme } from './index.ts';

import { themeBtn, themeArrow, themeArrowDark, themeBtnDark } from '../assets';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        aria-label="Toggle theme"
        style={{
          backgroundImage: `url(${theme === 'dark' ? themeBtnDark : themeBtn})`,
        }}
        className="absolute top-[58.5%] left-[36.2%] w-[20%] h-[37%] border-none bg-contain bg-no-repeat bg-center cursor-pointer pointer-events-auto transition-transform hover:scale-105 hover:brightness-110"
        onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <img
          style={{
            transform: theme === 'dark' ? 'rotate(-150deg)' : 'rotate(2deg)',
          }}
          src={theme === 'dark' ? themeArrowDark : themeArrow}
          alt="Theme Arrow"
          className={`absolute w-36 h-36 top-[-1%] left-[15%] transition-transform rotate-[42deg] `}
        />
      </button>
    </>
  );
}
