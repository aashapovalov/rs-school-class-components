import themeBtn from '../../assets/theme_button.png';
import themeArrow from '../../assets/theme_arrow.png';

export default function ThemeButton() {
  return (
    <>
      <button
        aria-label="Toggle theme"
        style={{ backgroundImage: `url(${themeBtn})` }}
        className="absolute top-[58.5%] left-[36%] w-[20%] h-[37%] border-none bg-contain bg-no-repeat bg-center cursor-pointer pointer-events-auto transition-transform hover:scale-105 hover:brightness-110"
      >
        <img
          src={themeArrow}
          alt="Theme Arrow"
          className={`absolute w-36 h-36 top-[-1%] left-[15%] transition-transform rotate-[42deg] dark:rotate-[-108deg]`}
        />
      </button>
    </>
  );
}
