import appLogo from '@/assets/app_logo.png';
import notFoundErrorRickImg from '@/assets/404_error_rick.png';

import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={appLogo}
        className="logo"
        alt={'Rick and Morty logo'}
        onClick={() => navigate('/')}
      />
      <div className="error-block">
        <p className="general-error">
          404 – This Link Doesn’t Exist in This Universe
        </p>
        <img
          src={notFoundErrorRickImg}
          alt="Rick sarcastic"
          className="general-error-rick"
        />
      </div>
    </div>
  );
}
