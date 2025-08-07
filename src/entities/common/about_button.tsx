import { useNavigate } from 'react-router';

import { useTheme } from '@/shared/hooks';

import aboutBtn from '../../assets/about_button.png';
import aboutBtnDark from '../../assets/about_button_dark.png';

export function AboutButton() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  function clickHandle() {
    navigate('/about');
  }

  return (
    <button
      style={{
        backgroundImage: `url(${theme === 'dark' ? aboutBtnDark : aboutBtn})`,
      }}
      className="about-btn dark:scale-[1.15]"
      onClick={clickHandle}
      aria-label="About author"
    />
  );
}
