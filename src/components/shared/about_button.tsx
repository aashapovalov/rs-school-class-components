import { useNavigate } from 'react-router';

export default function CrashButton() {
  const navigate = useNavigate();
  function clickHandle() {
    navigate('/about');
  }

  return (
    <button
      className="about-btn"
      onClick={clickHandle}
      aria-label="About author"
    />
  );
}
