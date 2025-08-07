import { useNavigate } from 'react-router';

import { useTheme } from '@/shared/hooks';

import { aboutBtn, aboutBtnDark } from '@/assets';

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
